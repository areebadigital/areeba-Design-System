package com.areeba.asterisk.compose

import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.Easing
import androidx.compose.animation.core.FiniteAnimationSpec
import androidx.compose.animation.core.tween
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.LayoutDirection
import com.areeba.asterisk.tokens.AsteriskTokens

/** Colours for one theme, from the tokens. Use these, never raw colours: they follow light and dark and keep text at 4.5:1. */
@Immutable
class AsteriskColors(t: AsteriskTokens.Colors, val dark: Boolean) {
    val brand = c(t.brand); val brandHover = c(t.brandHover); val brandSoft = c(t.brandSoft); val onBrand = c(t.onBrand)
    /** Signal Red: the logo and large headline highlights only, never buttons or status. */
    val accent = c(t.accent)
    val night = c(t.night); val onNight = c(t.onNight); val mint = c(t.mint)
    val surface = c(t.surface); val surfaceSunken = c(t.surfaceSunken); val surfaceRaised = c(t.surfaceRaised); val surfaceField = c(t.surfaceField)
    val ink = c(t.ink); val inkMuted = c(t.inkMuted); val inkDisabled = c(t.inkDisabled)
    val line = c(t.line); val lineStrong = c(t.lineStrong); val focus = c(t.focus)
    val success = c(t.success); val successSoft = c(t.successSoft); val warning = c(t.warning); val warningSoft = c(t.warningSoft)
    val danger = c(t.danger); val dangerSoft = c(t.dangerSoft); val info = c(t.info); val infoSoft = c(t.infoSoft)
    private companion object { fun c(argb: Long) = Color(argb.toInt()) }
}

/** Font families. Card machines and apps bundle the fonts (res/font on Android) and pass them in; the defaults are the system fonts. */
@Immutable
data class AsteriskFonts(
    val sans: FontFamily = FontFamily.Default,
    val arabic: FontFamily = FontFamily.Default,
    val mono: FontFamily = FontFamily.Monospace,
)

/** An analytics event: `asterisk.<component>.<action>`. It never carries what people type or see. */
data class AsteriskEvent(
    val name: String, val component: String, val action: String, val analyticsId: String?, val screen: String?,
    val details: Map<String, Any>, val platform: String = "kotlin", val time: Long,
)

@Immutable
class AsteriskTheme(
    val colors: AsteriskColors, val fonts: AsteriskFonts, val arabic: Boolean, val rtl: Boolean, val reduceMotion: Boolean,
    val analytics: ((AsteriskEvent) -> Unit)?, val screen: String?, val context: Map<String, Any>,
) {
    /** Token duration in ms; 0 when motion is off (system setting or [reduceMotion]). */
    fun duration(d: Duration): Int = if (reduceMotion) 0 else d.ms
    fun <T> tween(d: Duration, easing: Ease = Ease.Standard): FiniteAnimationSpec<T> = tween(duration(d), easing = easing.easing)
}

enum class Duration(val ms: Int) {
    Instant(AsteriskTokens.Motion.DurationInstant), Fast(AsteriskTokens.Motion.DurationFast),
    Base(AsteriskTokens.Motion.DurationBase), Slow(AsteriskTokens.Motion.DurationSlow),
}

enum class Ease(p: FloatArray) {
    Standard(AsteriskTokens.Motion.EaseStandard), Enter(AsteriskTokens.Motion.EaseEnter), Exit(AsteriskTokens.Motion.EaseExit);
    val easing: Easing = CubicBezierEasing(p[0], p[1], p[2], p[3])
}

val LocalAsterisk = staticCompositionLocalOf<AsteriskTheme> { error("Wrap the screen in AsteriskTheme { }") }

/** The current theme: colours, fonts, direction, motion and analytics. */
object Asterisk {
    val theme: AsteriskTheme @Composable @ReadOnlyComposable get() = LocalAsterisk.current
    val colors: AsteriskColors @Composable @ReadOnlyComposable get() = LocalAsterisk.current.colors
}

/**
 * Wrap every screen (and the customer display) once.
 * ```
 * AsteriskTheme(dark = isSystemInDarkTheme(), locale = "ar", fonts = AppFonts, analytics = { e -> tracker.log(e.name, e.details) }, screen = "sale") { … }
 * ```
 * - `locale = "ar"` switches to the Arabic font, turns letter spacing off and lays out right to left (override with [rtl]).
 * - `reduceMotion`: pass the system setting (on Android, `Settings.Global.ANIMATOR_DURATION_SCALE == 0f`); every duration becomes 0.
 */
@Composable
fun AsteriskTheme(
    dark: Boolean = false, locale: String = "en", rtl: Boolean? = null, fonts: AsteriskFonts = AsteriskFonts(), reduceMotion: Boolean = false,
    analytics: ((AsteriskEvent) -> Unit)? = null, screen: String? = null, context: Map<String, Any> = emptyMap(), content: @Composable () -> Unit,
) {
    val arabic = locale.lowercase().startsWith("ar")
    val isRtl = rtl ?: arabic
    val theme = AsteriskTheme(AsteriskColors(if (dark) AsteriskTokens.Dark else AsteriskTokens.Light, dark), fonts, arabic, isRtl, reduceMotion, analytics, screen, safe(context))
    CompositionLocalProvider(LocalAsterisk provides theme, LocalLayoutDirection provides if (isRtl) LayoutDirection.Rtl else LayoutDirection.Ltr, content = content)
}
