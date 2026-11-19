package com.areeba.asterisk.compose

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.drawscope.withTransform
import androidx.compose.ui.graphics.vector.PathParser
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDirection
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.areeba.asterisk.tokens.AsteriskTokens

/** Type scale from the tokens. */
enum class TextVariant(internal val t: AsteriskTokens.TextStyle) {
    DisplayXl(AsteriskTokens.Type.DisplayXl), DisplayLg(AsteriskTokens.Type.DisplayLg), Display(AsteriskTokens.Type.Display),
    H1(AsteriskTokens.Type.H1), H2(AsteriskTokens.Type.H2), H3(AsteriskTokens.Type.H3),
    BodyLg(AsteriskTokens.Type.BodyLg), Body(AsteriskTokens.Type.Body), BodySm(AsteriskTokens.Type.BodySm),
    Label(AsteriskTokens.Type.Label), Caption(AsteriskTokens.Type.Caption),
    AmountXl(AsteriskTokens.Type.AmountXl), Amount(AsteriskTokens.Type.Amount), Code(AsteriskTokens.Type.Code),
}

/** The text style for a variant in the current theme: Arabic uses the Arabic font and no letter spacing. */
@Composable
fun textStyle(variant: TextVariant, weight: Int? = null): TextStyle {
    val theme = Asterisk.theme
    val t = variant.t
    val family = when { t.mono -> theme.fonts.mono; theme.arabic -> theme.fonts.arabic; else -> theme.fonts.sans }
    return TextStyle(
        fontFamily = family, fontSize = t.fontSizeSp.sp, lineHeight = t.lineHeightSp.sp, fontWeight = FontWeight(weight ?: t.fontWeight),
        letterSpacing = if (theme.arabic) 0.sp else t.letterSpacingSp.sp, fontFeatureSettings = if (t.tabularNums) "tnum" else null,
    )
}

/** Text in the design system's type scale. */
@Composable
fun AText(
    text: String, modifier: Modifier = Modifier, variant: TextVariant = TextVariant.Body, weight: Int? = null, color: Color = Asterisk.colors.ink,
    align: TextAlign? = null, maxLines: Int = Int.MAX_VALUE, ltr: Boolean = false,
) {
    val base = textStyle(variant, weight).copy(color = color, textAlign = align ?: TextAlign.Unspecified)
    val style = if (ltr) base.copy(textDirection = TextDirection.Ltr) else base
    BasicText(if (ltr) ltr(text) else text, modifier, style = style, maxLines = maxLines, overflow = TextOverflow.Ellipsis)
}

/** Keeps amounts, IBANs, card and phone numbers left to right inside Arabic text (Unicode isolate). */
fun ltr(text: String): String = "⁦$text⁩"

/** A 24×24 stroke icon from the shared set ([ICON_PATHS]). Directional icons mirror in right-to-left. Decorative: label the control, not the icon. */
@Composable
fun Icon(name: String, modifier: Modifier = Modifier, size: Dp = AsteriskTokens.Size.Icon.dp, color: Color = Asterisk.colors.ink) {
    val def = ICON_PATHS[name] ?: return
    // Mirrors with the layout it sits in (the keypad stays left to right in Arabic, so its icons do too).
    val flip = def.flip && androidx.compose.ui.platform.LocalLayoutDirection.current == androidx.compose.ui.unit.LayoutDirection.Rtl
    val paths = remember(name) { def.paths.map { PathParser().parsePathString(it).toPath() } }
    Canvas(modifier.size(size)) {
        val k = this.size.width / 24f
        val stroke = Stroke(width = 1.75f, cap = StrokeCap.Round, join = StrokeJoin.Round)
        withTransform({
            if (flip) { translate(this@Canvas.size.width, 0f); scale(-k, k, pivot = Offset.Zero) } else scale(k, k, pivot = Offset.Zero)
        }) { paths.forEach { drawPath(it, color, style = stroke) } }
    }
}
