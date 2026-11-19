package com.areeba.asterisk.compose

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.areeba.asterisk.tokens.AsteriskTokens.Radius
import com.areeba.asterisk.tokens.AsteriskTokens.Space

/** How the customer can pay on this terminal. */
enum class CardMethod(internal val en: String, internal val ar: String) { Tap("Tap", "انقر"), Insert("Insert", "أدخل"), Swipe("Swipe", "مرّر") }

/**
 * "Tap, insert or swipe" with the amount due. Shown on the merchant screen when the terminal waits for a card,
 * and on the customer display. The contactless mark enters once; nothing loops.
 */
@Composable
fun CardPrompt(amount: String, modifier: Modifier = Modifier, currency: String = "$", title: String? = null, methods: List<CardMethod> = CardMethod.entries, analytics: Analytics? = null) {
    val c = Asterisk.colors
    val ar = Asterisk.theme.arabic
    Shown("CardPrompt", analytics, mapOf("methods" to methods.size))
    Column(modifier, horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(Space.S5.dp)) {
        Box(Modifier.size(112.dp).enter(EnterKind.Scale, Duration.Slow).background(c.brandSoft, CircleShape), contentAlignment = Alignment.Center) {
            Icon("contactless", size = 56.dp, color = c.brand)
        }
        AmountDisplay(formatAmount(amount), currency = currency, label = if (ar) "المبلغ المستحق" else "Amount due")
        AText(title ?: if (ar) "قرّب البطاقة أو الهاتف من الشاشة" else "Hold the card or phone near the screen", Modifier.semantics { liveRegion = LiveRegionMode.Polite },
            variant = TextVariant.BodyLg, weight = 600, align = TextAlign.Center)
        Row(horizontalArrangement = Arrangement.spacedBy(Space.S2.dp)) {
            methods.forEach { m -> Badge(if (ar) m.ar else m.en, tone = Tone.Neutral) }
        }
    }
}

enum class ResultTone { Approved, Declined, Pending }

/**
 * The outcome of a payment. Approved uses success (never Signal Red); Declined says why and what to do next.
 * Sends `asterisk.result.shown` with the tone only.
 */
@Composable
fun PaymentResult(
    tone: ResultTone, title: String, modifier: Modifier = Modifier, message: String? = null, amount: String? = null, currency: String = "$",
    actions: @Composable () -> Unit = {}, analytics: Analytics? = null,
) {
    val c = Asterisk.colors
    Shown("Result", analytics, mapOf("tone" to tone.name.lowercase()))
    val (fg, bg, icon) = when (tone) {
        ResultTone.Approved -> Triple(c.success, c.successSoft, "tick")
        ResultTone.Declined -> Triple(c.danger, c.dangerSoft, "close")
        ResultTone.Pending -> Triple(c.warning, c.warningSoft, "info")
    }
    Column(modifier.padding(Space.S6.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(Space.S4.dp)) {
        Box(Modifier.size(96.dp).enter(EnterKind.Scale, Duration.Slow).background(bg, CircleShape), contentAlignment = Alignment.Center) { Icon(icon, size = 48.dp, color = fg) }
        AText(title, Modifier.semantics { heading(); liveRegion = if (tone == ResultTone.Declined) LiveRegionMode.Assertive else LiveRegionMode.Polite }.enter(),
            variant = TextVariant.H2, weight = 600, align = TextAlign.Center)
        if (amount != null) AText(currency + formatAmount(amount), variant = TextVariant.Amount, weight = 500, ltr = true)
        if (message != null) AText(message, variant = TextVariant.Body, color = c.inkMuted, align = TextAlign.Center)
        Column(Modifier.padding(top = Space.S2.dp), verticalArrangement = Arrangement.spacedBy(Space.S2.dp)) { actions() }
    }
}

/** A short payment step indicator ("Processing…", "Remove card"), with a steady mark instead of a spinner. */
@Composable
fun PaymentStep(text: String, modifier: Modifier = Modifier, icon: String = "card") {
    val c = Asterisk.colors
    Row(modifier.background(c.surfaceSunken, RoundedCornerShape(Radius.Full.dp)).padding(horizontal = Space.S5.dp, vertical = Space.S3.dp).enter(EnterKind.Fade),
        horizontalArrangement = Arrangement.spacedBy(Space.S2.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(icon, size = 20.dp, color = c.inkMuted)
        AText(text, Modifier.semantics { liveRegion = LiveRegionMode.Polite }, variant = TextVariant.Body, weight = 600)
    }
}
