package com.areeba.asterisk.compose

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.areeba.asterisk.tokens.AsteriskTokens.Space

/** What the customer-facing screen shows. The merchant screen moves it along a sale; the customer only ever sees one step. */
sealed interface CustomerScreen {
    /** Between sales: the merchant's name and a welcome. */
    data class Idle(val merchant: String, val message: String? = null) : CustomerScreen
    /** The basket while the merchant rings it up. */
    data class Basket(val lines: List<Detail>, val total: String, val currency: String = "$") : CustomerScreen
    /** Waiting for the card: amount due and "tap, insert or swipe". */
    data class Pay(val amount: String, val currency: String = "$", val methods: List<CardMethod> = CardMethod.entries) : CustomerScreen
    /** Authorising, or a step for the customer ("Enter your PIN on the keypad", "Remove card"). */
    data class Step(val text: String, val icon: String = "card") : CustomerScreen
    /** Approved, declined or pending, with what to do next. */
    data class Result(val tone: ResultTone, val title: String, val message: String? = null, val amount: String? = null, val currency: String = "$") : CustomerScreen
}

/**
 * Shared state between the merchant screen and the customer display. Hold one per sale flow (for example in a ViewModel):
 * ```
 * val customer = remember { CustomerDisplayController(CustomerScreen.Idle("Green Grocer")) }
 * customer.show(CustomerScreen.Pay("24.50"))
 * ```
 * [locale] is the customer's language, which can differ from the merchant's.
 */
@Stable
class CustomerDisplayController(initial: CustomerScreen, locale: String = "en") {
    var screen: CustomerScreen by mutableStateOf(initial); private set
    var locale: String by mutableStateOf(locale)
    fun show(next: CustomerScreen) { screen = next }
}

/**
 * The customer-facing screen of a dual-screen card machine. Large type, one message at a time, high contrast.
 * Draw it inside its own [AsteriskTheme] (usually dark) with the customer's locale; on Android, [CustomerPresentation] does this
 * on the terminal's second display. Each step enters with a fade; nothing loops and nothing is interactive.
 */
@Composable
fun CustomerDisplay(screen: CustomerScreen, modifier: Modifier = Modifier) {
    val c = Asterisk.colors
    val ar = Asterisk.theme.arabic
    Box(modifier.fillMaxSize().background(c.surface).padding(Space.S8.dp), contentAlignment = Alignment.Center) {
        key(screen) {
            Box(Modifier.fillMaxSize().enter(EnterKind.Fade), contentAlignment = Alignment.Center) {
                when (screen) {
                    is CustomerScreen.Idle -> Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(Space.S3.dp)) {
                        AText(screen.merchant, variant = TextVariant.Display, weight = 600, align = TextAlign.Center)
                        AText(screen.message ?: if (ar) "أهلًا بك" else "Welcome", variant = TextVariant.H3, color = c.inkMuted, align = TextAlign.Center)
                    }
                    is CustomerScreen.Basket -> Column(Modifier.widthIn(max = 560.dp).fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(Space.S2.dp)) {
                        DetailList(screen.lines.takeLast(5))
                        Row(Modifier.fillMaxWidth().padding(top = Space.S2.dp), verticalAlignment = Alignment.CenterVertically) {
                            AText(if (ar) "المجموع" else "Total", Modifier.weight(1f), variant = TextVariant.H2, weight = 600)
                            AText(screen.currency + formatAmount(screen.total), variant = TextVariant.AmountXl, weight = 500, ltr = true, maxLines = 1)
                        }
                    }
                    is CustomerScreen.Pay -> CardPrompt(screen.amount, currency = screen.currency, methods = screen.methods)
                    is CustomerScreen.Step -> Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(Space.S4.dp)) {
                        Icon(screen.icon, size = 64.dp, color = c.brand)
                        AText(screen.text, variant = TextVariant.H2, weight = 600, align = TextAlign.Center)
                    }
                    is CustomerScreen.Result -> PaymentResult(screen.tone, screen.title, message = screen.message, amount = screen.amount, currency = screen.currency)
                }
            }
        }
    }
}

/** Draws the controller's current screen in the customer's language. */
@Composable
fun CustomerDisplay(controller: CustomerDisplayController, modifier: Modifier = Modifier, dark: Boolean = true, fonts: AsteriskFonts = AsteriskFonts(), reduceMotion: Boolean = false) {
    AsteriskTheme(dark = dark, locale = controller.locale, fonts = fonts, reduceMotion = reduceMotion) { CustomerDisplay(controller.screen, modifier) }
}
