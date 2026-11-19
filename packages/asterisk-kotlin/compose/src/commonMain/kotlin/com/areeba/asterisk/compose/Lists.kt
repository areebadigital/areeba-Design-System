package com.areeba.asterisk.compose

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.areeba.asterisk.tokens.AsteriskTokens.Space

/** One label and value of a receipt or transaction summary. [ltr] keeps amounts, references and card numbers left to right. */
data class Detail(val label: String, val value: String, val ltr: Boolean = false, val emphasis: Boolean = false)

/** Receipts and summaries: label at the start, value at the end, a rule above an emphasised total. */
@Composable
fun DetailList(items: List<Detail>, modifier: Modifier = Modifier) {
    val c = Asterisk.colors
    Column(modifier.fillMaxWidth()) {
        items.forEachIndexed { i, d ->
            if (d.emphasis && i > 0) Box(Modifier.fillMaxWidth().padding(vertical = Space.S1.dp).height(1.dp).background(c.line))
            Row(Modifier.fillMaxWidth().padding(vertical = Space.S2.dp), verticalAlignment = Alignment.CenterVertically) {
                AText(d.label, Modifier.weight(1f), variant = if (d.emphasis) TextVariant.Body else TextVariant.BodySm, weight = if (d.emphasis) 600 else null, color = if (d.emphasis) c.ink else c.inkMuted)
                AText(d.value, variant = if (d.emphasis) TextVariant.Amount else TextVariant.Body, weight = if (d.emphasis) 600 else 500, ltr = d.ltr, maxLines = 1)
            }
        }
    }
}

/**
 * A sale or refund in the terminal's history. Tapping opens it (reprint, refund, void). Sends `asterisk.listitem.press` without the amount.
 */
@Composable
fun TransactionRow(
    title: String, amount: String, modifier: Modifier = Modifier, subtitle: String? = null, status: String? = null, statusTone: Tone = Tone.Neutral,
    icon: String = "card", onClick: (() -> Unit)? = null, analytics: Analytics? = null,
) {
    val c = Asterisk.colors
    val track = rememberTrack("ListItem", analytics)
    Row(modifier.fillMaxWidth().heightIn(min = 64.dp).then(if (onClick != null) Modifier.pressable(true, pressedScale = 0.99f) { track("press", emptyMap(), null); onClick() } else Modifier)
        .padding(horizontal = Space.S4.dp, vertical = Space.S3.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(Space.S3.dp)) {
        Box(Modifier.size(40.dp).background(c.surfaceSunken, CircleShape), contentAlignment = Alignment.Center) { Icon(icon, size = 20.dp, color = c.inkMuted) }
        Column(Modifier.weight(1f)) {
            AText(title, variant = TextVariant.Body, weight = 600, maxLines = 1)
            if (subtitle != null) AText(subtitle, variant = TextVariant.BodySm, color = c.inkMuted, maxLines = 1)
        }
        Column(horizontalAlignment = Alignment.End, verticalArrangement = Arrangement.spacedBy(Space.S1.dp)) {
            AText(amount, variant = TextVariant.Body, weight = 600, ltr = true, maxLines = 1)
            if (status != null) Badge(status, tone = statusTone, dot = true)
        }
    }
}
