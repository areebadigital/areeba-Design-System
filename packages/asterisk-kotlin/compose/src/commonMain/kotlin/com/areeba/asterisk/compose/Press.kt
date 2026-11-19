package com.areeba.asterisk.compose

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.semantics.Role

/** Clickable with the system press feedback: scales to [pressedScale] over the fast duration (none when motion is off). */
@Composable
internal fun Modifier.pressable(enabled: Boolean, role: Role = Role.Button, pressedScale: Float = 0.97f, onClick: () -> Unit): Modifier {
    val source = remember { MutableInteractionSource() }
    val pressed by source.collectIsPressedAsState()
    val scale by animateFloatAsState(if (pressed && enabled) pressedScale else 1f, Asterisk.theme.tween(Duration.Fast), label = "press")
    return this.graphicsLayer { scaleX = scale; scaleY = scale }.clickable(source, indication = null, enabled = enabled, role = role, onClick = onClick)
}
