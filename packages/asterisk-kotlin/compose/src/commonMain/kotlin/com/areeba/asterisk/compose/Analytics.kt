package com.areeba.asterisk.compose

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState

/** Common props for interactive components: a stable name for analytics and UI tests, and extra safe context. */
class Analytics(val id: String? = null, val data: Map<String, Any> = emptyMap())

/** Only plain values travel: numbers, booleans and short strings (option values, not what people typed). */
internal fun safe(map: Map<String, Any>?): Map<String, Any> =
    map.orEmpty().filterValues { it is Number || it is Boolean || (it is String && it.length <= 64) }

/** Returns `track(action, details, group)`, which sends `asterisk.<group or component>.<action>`. Nothing is sent without `analytics`. */
@Composable
fun rememberTrack(component: String, analytics: Analytics?): (String, Map<String, Any>, String?) -> Unit {
    val theme = Asterisk.theme
    val props = rememberUpdatedState(analytics)
    return remember(theme, component) {
        { action, details, group ->
            val send = theme.analytics
            if (send != null) {
                val a = props.value
                val e = AsteriskEvent(
                    name = "asterisk.${group ?: component.lowercase()}.$action", component = component, action = action,
                    analyticsId = a?.id, screen = theme.screen, details = theme.context + safe(a?.data) + safe(details), time = nowMillis(),
                )
                try { send(e) } catch (_: Throwable) { /* analytics must never break a payment */ }
            }
        }
    }
}

/** Sends `field.error_shown` each time [error] becomes set. */
@Composable
internal fun ErrorShown(component: String, analytics: Analytics?, error: String?) {
    val track = rememberTrack(component, analytics)
    val shown = error != null
    LaunchedEffect(shown) { if (shown) track("error_shown", emptyMap(), "field") }
}

/** Sends `<component>.shown` once. */
@Composable
internal fun Shown(component: String, analytics: Analytics?, details: Map<String, Any> = emptyMap()) {
    val track = rememberTrack(component, analytics)
    LaunchedEffect(Unit) { track("shown", details, null) }
}

internal expect fun nowMillis(): Long
