package com.areeba.asterisk.compose

import androidx.compose.animation.core.Animatable
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalDensity
import com.areeba.asterisk.tokens.AsteriskTokens

enum class EnterKind { Fade, Rise, Scale }

/** Animates what enters (never what leaves): fade, rise by the motion distance, or scale in. Instant when motion is off. */
@Composable
fun Modifier.enter(kind: EnterKind = EnterKind.Rise, duration: Duration = Duration.Base, key: Any? = Unit): Modifier {
    val theme = Asterisk.theme
    val p = remember(key) { Animatable(if (theme.reduceMotion) 1f else 0f) }
    LaunchedEffect(key) { p.animateTo(1f, theme.tween(duration, Ease.Enter)) }
    val distance = with(LocalDensity.current) { AsteriskTokens.Motion.DistanceDp.toFloat() * density }
    return graphicsLayer {
        val v = p.value
        alpha = v
        when (kind) {
            EnterKind.Rise -> translationY = (1f - v) * distance
            EnterKind.Scale -> { val s = 0.92f + 0.08f * v; scaleX = s; scaleY = s }
            EnterKind.Fade -> {}
        }
    }
}
