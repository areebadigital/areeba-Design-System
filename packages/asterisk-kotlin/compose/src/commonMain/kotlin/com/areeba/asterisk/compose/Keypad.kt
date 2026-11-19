package com.areeba.asterisk.compose

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.runtime.CompositionLocalProvider
import com.areeba.asterisk.tokens.AsteriskTokens.Radius
import com.areeba.asterisk.tokens.AsteriskTokens.Space

/** Applies a keypad key ("0"–"9", "00", ".", "back", "clear") to an amount string, keeping at most two decimals and [maxDigits] whole digits. */
fun padInput(value: String, key: String, maxDigits: Int = 9): String {
    val v = if (value == "0") "" else value
    return when (key) {
        "back" -> v.dropLast(1).ifEmpty { "0" }
        "clear" -> "0"
        "." -> if ("." in v) value else (v.ifEmpty { "0" }) + "."
        else -> {
            val next = v + key
            val parts = next.split(".")
            if (parts[0].length > maxDigits || (parts.size > 1 && parts[1].length > 2)) value else next.trimStart('0').let { if (it.isEmpty() || it.startsWith(".")) "0$it" else it }
        }
    }
}

/**
 * The card machine's number pad: big keys (64dp), digits always laid out 1-2-3 left to right, in every language, like a phone keypad.
 * [decimal] shows "." (else "00", for amounts typed in cents). Never tracks which keys are pressed.
 */
@Composable
fun Keypad(onKey: (String) -> Unit, modifier: Modifier = Modifier, decimal: Boolean = false, enabled: Boolean = true, backLabel: String = if (Asterisk.theme.arabic) "حذف" else "Delete") {
    val rows = listOf(listOf("1", "2", "3"), listOf("4", "5", "6"), listOf("7", "8", "9"), listOf(if (decimal) "." else "00", "0", "back"))
    CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Ltr) {
        Column(modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(Space.S2.dp)) {
            rows.forEach { row ->
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(Space.S2.dp)) {
                    row.forEach { k -> Key(k, if (k == "back") backLabel else null, enabled, Modifier.weight(1f)) { onKey(k) } }
                }
            }
        }
    }
}

@Composable
private fun Key(key: String, label: String?, enabled: Boolean, modifier: Modifier, onClick: () -> Unit) {
    val c = Asterisk.colors
    Box(
        modifier.height(64.dp).background(if (key == "back") c.surface else c.surfaceSunken, RoundedCornerShape(Radius.Sm.dp)).border(1.dp, c.line, RoundedCornerShape(Radius.Sm.dp))
            .then(if (label != null) Modifier.semantics { contentDescription = label } else Modifier)
            .pressable(enabled, pressedScale = 0.95f, onClick = onClick),
        contentAlignment = Alignment.Center,
    ) { if (key == "back") Icon("backspace", color = c.ink) else AText(key, variant = TextVariant.H2, weight = 500) }
}

/** PIN entry progress. The PIN itself is entered on the secure PIN pad of the terminal; this only shows how many digits are in. */
@Composable
fun PinDots(filled: Int, modifier: Modifier = Modifier, length: Int = 4, error: String? = null, label: String = if (Asterisk.theme.arabic) "الرقم السري" else "PIN", analytics: Analytics? = null) {
    val c = Asterisk.colors
    ErrorShown("PinDots", analytics, error)
    Column(modifier.semantics { contentDescription = "$label $filled/$length" }, horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(Space.S3.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(Space.S4.dp)) {
            repeat(length) { i ->
                val on = i < filled
                val fill by animateColorAsState(if (error != null) c.danger else if (on) c.ink else c.surface, Asterisk.theme.tween(Duration.Fast), label = "dot")
                Box(Modifier.size(16.dp).background(fill, CircleShape).border(1.5.dp, if (error != null) c.danger else if (on) c.ink else c.lineStrong, CircleShape))
            }
        }
        if (error != null) AText(error, Modifier.semantics { liveRegion = LiveRegionMode.Assertive }, variant = TextVariant.BodySm, color = c.danger)
    }
}
