package com.areeba.asterisk.compose

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.disabled
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.areeba.asterisk.tokens.AsteriskTokens.Radius
import com.areeba.asterisk.tokens.AsteriskTokens.Space

enum class ButtonVariant { Primary, Secondary, Ghost, Danger }

/** Size on card machines: [Lg] (56dp) for the main action of a payment screen, [Md] (48dp, the minimum touch target) elsewhere. */
enum class ButtonSize(internal val height: Int) { Md(48), Lg(56) }

/**
 * Every action. One Primary per screen; Danger only for destructive steps (void, refund). Signal Red is never a button.
 * Sends `asterisk.button.press` with the variant.
 */
@Composable
fun Button(
    text: String, onClick: () -> Unit, modifier: Modifier = Modifier, variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.Md, block: Boolean = false, enabled: Boolean = true, icon: String? = null, analytics: Analytics? = null,
) {
    val c = Asterisk.colors
    val track = rememberTrack("Button", analytics)
    val (bg, fg) = when (variant) {
        ButtonVariant.Primary -> c.brand to c.onBrand
        ButtonVariant.Secondary -> c.brandSoft to c.brand
        ButtonVariant.Ghost -> Color.Transparent to c.brand
        ButtonVariant.Danger -> c.danger to Color.White
    }
    Row(
        modifier.then(if (block) Modifier.fillMaxWidth() else Modifier).height(size.height.dp).defaultMinSize(minWidth = size.height.dp)
            .alpha(if (enabled) 1f else 0.45f).background(bg, RoundedCornerShape(Radius.Xs.dp))
            .pressable(enabled) { track("press", mapOf("variant" to variant.name.lowercase()), "button"); onClick() }
            .padding(horizontal = Space.S5.dp),
        horizontalArrangement = Arrangement.spacedBy(Space.S2.dp, Alignment.CenterHorizontally), verticalAlignment = Alignment.CenterVertically,
    ) {
        if (icon != null) Icon(icon, size = 20.dp, color = fg)
        AText(text, variant = if (size == ButtonSize.Lg) TextVariant.BodyLg else TextVariant.Body, weight = 600, color = fg, maxLines = 1)
    }
}

/** An icon-only action. [label] is what screen readers say. Sends `asterisk.button.press`. */
@Composable
fun IconButton(icon: String, label: String, onClick: () -> Unit, modifier: Modifier = Modifier, plain: Boolean = false, enabled: Boolean = true, analytics: Analytics? = null) {
    val c = Asterisk.colors
    val track = rememberTrack("IconButton", analytics)
    Box(
        modifier.size(48.dp).alpha(if (enabled) 1f else 0.45f)
            .then(if (plain) Modifier else Modifier.background(c.surfaceSunken, CircleShape).border(1.dp, c.line, CircleShape))
            .semantics { contentDescription = label; if (!enabled) disabled() }
            .pressable(enabled, pressedScale = 0.94f) { track("press", mapOf("variant" to if (plain) "plain" else "default"), "button"); onClick() },
        contentAlignment = Alignment.Center,
    ) { Icon(icon, color = c.ink) }
}
