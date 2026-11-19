package com.areeba.asterisk.compose

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.areeba.asterisk.tokens.AsteriskTokens.Radius
import com.areeba.asterisk.tokens.AsteriskTokens.Space

enum class Tone { Neutral, Brand, Success, Warning, Danger, Info }

@Composable
internal fun toneColors(tone: Tone): Pair<Color, Color> {
    val c = Asterisk.colors
    return when (tone) {
        Tone.Neutral -> c.inkMuted to c.surfaceSunken
        Tone.Brand -> c.brand to c.brandSoft
        Tone.Success -> c.success to c.successSoft
        Tone.Warning -> c.warning to c.warningSoft
        Tone.Danger -> c.danger to c.dangerSoft
        Tone.Info -> c.info to c.infoSoft
    }
}

/** Transaction and terminal status. Colour is never the only signal: the word says it. */
@Composable
fun Badge(text: String, modifier: Modifier = Modifier, tone: Tone = Tone.Neutral, dot: Boolean = false) {
    val (fg, bg) = toneColors(tone)
    Row(modifier.background(bg, RoundedCornerShape(Radius.Full.dp)).padding(horizontal = Space.S3.dp, vertical = Space.S1.dp),
        horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
        if (dot) Box(Modifier.size(6.dp).background(fg, CircleShape))
        AText(text, variant = TextVariant.Caption, weight = 600, color = fg, maxLines = 1)
    }
}

/** An inline system message (low battery, offline, paper out). Danger and warning are announced. Sends `asterisk.alert.shown`. */
@Composable
fun Banner(title: String, modifier: Modifier = Modifier, message: String? = null, tone: Tone = Tone.Info, action: (@Composable () -> Unit)? = null, analytics: Analytics? = null) {
    val (fg, bg) = toneColors(tone)
    Shown("Alert", analytics, mapOf("tone" to tone.name.lowercase()))
    val icon = when (tone) { Tone.Success -> "check"; Tone.Warning, Tone.Danger -> "alert"; else -> "info" }
    Row(modifier.fillMaxWidth().background(bg, RoundedCornerShape(Radius.Sm.dp)).padding(Space.S4.dp).enter()
        .semantics(mergeDescendants = true) { liveRegion = if (tone == Tone.Danger || tone == Tone.Warning) LiveRegionMode.Assertive else LiveRegionMode.Polite },
        horizontalArrangement = Arrangement.spacedBy(Space.S3.dp)) {
        Icon(icon, size = 20.dp, color = fg)
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
            AText(title, variant = TextVariant.Body, weight = 600)
            if (message != null) AText(message, variant = TextVariant.BodySm, color = Asterisk.colors.inkMuted)
        }
        if (action != null) action()
    }
}

/**
 * The top of every merchant screen on a card machine: merchant name, terminal id, connection and printer state.
 * The terminal id stays left to right. Battery and clock belong to the system bar, not here.
 */
@Composable
fun TerminalHeader(
    merchant: String, modifier: Modifier = Modifier, terminalId: String? = null, online: Boolean = true, printerReady: Boolean = true, end: (@Composable () -> Unit)? = null,
) {
    val c = Asterisk.colors
    val ar = Asterisk.theme.arabic
    Row(modifier.fillMaxWidth().padding(horizontal = Space.S4.dp, vertical = Space.S3.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(Space.S3.dp)) {
        Column(Modifier.weight(1f)) {
            AText(merchant, variant = TextVariant.Body, weight = 600, maxLines = 1)
            if (terminalId != null) AText((if (ar) "الجهاز " else "Terminal ") + ltr(terminalId), variant = TextVariant.Caption, color = c.inkMuted, maxLines = 1)
        }
        Badge(if (online) (if (ar) "متصل" else "Online") else (if (ar) "غير متصل" else "Offline"), tone = if (online) Tone.Success else Tone.Warning, dot = true)
        if (!printerReady) Box(Modifier.size(32.dp).border(1.dp, c.warning, CircleShape), contentAlignment = Alignment.Center) { Icon("printer", size = 18.dp, color = c.warning) }
        if (end != null) end()
    }
}
