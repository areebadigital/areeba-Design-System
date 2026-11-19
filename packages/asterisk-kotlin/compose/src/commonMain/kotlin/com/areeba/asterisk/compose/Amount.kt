package com.areeba.asterisk.compose

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.areeba.asterisk.tokens.AsteriskTokens.Space

/** Formats an amount string from [padInput] for display: thousands separators, two decimals once a "." is typed. Digits stay Latin. */
fun formatAmount(value: String): String {
    val parts = value.split(".")
    val whole = parts[0].ifEmpty { "0" }.reversed().chunked(3).joinToString(",").reversed()
    return if (parts.size > 1) "$whole.${parts[1]}" else whole
}

/**
 * The amount on a sale, refund or customer display: currency then digits, always left to right, in every language.
 * [large] is for the amount being entered or due; screen readers hear the full amount.
 */
@Composable
fun AmountDisplay(
    amount: String, modifier: Modifier = Modifier, currency: String = "$", label: String? = null, hint: String? = null, error: String? = null,
    large: Boolean = true, color: Color = Asterisk.colors.ink, analytics: Analytics? = null,
) {
    val c = Asterisk.colors
    ErrorShown("AmountDisplay", analytics, error)
    Column(modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(Space.S1.dp)) {
        if (label != null) AText(label, variant = TextVariant.BodySm, color = c.inkMuted)
        // Currency then digits, left to right in every language.
        CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Ltr) {
        Row(Modifier.semantics(mergeDescendants = true) { contentDescription = "$currency$amount"; liveRegion = LiveRegionMode.Polite }, verticalAlignment = Alignment.Bottom) {
            AText("$currency ", variant = if (large) TextVariant.H1 else TextVariant.H3, color = c.inkMuted)
            AText(amount, variant = if (large) TextVariant.AmountXl else TextVariant.Amount, weight = 500, color = if (error != null) c.danger else color, ltr = true, maxLines = 1)
        }
        }
        when {
            error != null -> AText(error, variant = TextVariant.BodySm, color = c.danger)
            hint != null -> AText(hint, variant = TextVariant.BodySm, color = c.inkMuted)
        }
    }
}
