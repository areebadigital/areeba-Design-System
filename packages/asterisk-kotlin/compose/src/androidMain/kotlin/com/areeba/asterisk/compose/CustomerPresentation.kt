package com.areeba.asterisk.compose

import android.app.Presentation
import android.content.Context
import android.hardware.display.DisplayManager
import android.os.Bundle
import android.provider.Settings
import android.view.Display
import androidx.compose.ui.platform.ComposeView
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.setViewTreeLifecycleOwner
import androidx.savedstate.SavedStateRegistryOwner
import androidx.savedstate.setViewTreeSavedStateRegistryOwner

/**
 * Shows [CustomerDisplay] on the card machine's customer-facing screen (Android's presentation display), driven by the
 * same [CustomerDisplayController] as the merchant screen.
 * ```
 * // in the sale Activity (a ComponentActivity)
 * presentation = CustomerPresentation.showIfAvailable(this, this, customer, fonts = AppFonts)
 * override fun onStop() { presentation?.dismiss(); super.onStop() }
 * ```
 * Terminals whose customer display is not an Android display (some vendors drive it through their own SDK) can draw
 * [CustomerDisplay] into that SDK's view instead.
 */
class CustomerPresentation<T>(
    context: Context, display: Display, private val owner: T, private val controller: CustomerDisplayController,
    private val fonts: AsteriskFonts = AsteriskFonts(), private val dark: Boolean = true,
) : Presentation(context, display) where T : LifecycleOwner, T : SavedStateRegistryOwner {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val view = ComposeView(context)
        view.setViewTreeLifecycleOwner(owner)
        view.setViewTreeSavedStateRegistryOwner(owner)
        val reduce = systemReduceMotion(context)
        view.setContent { CustomerDisplay(controller, dark = dark, fonts = fonts, reduceMotion = reduce) }
        setContentView(view)
    }

    companion object {
        /** The first presentation display (the customer screen), or null on single-screen terminals. */
        fun customerDisplay(context: Context): Display? =
            (context.getSystemService(Context.DISPLAY_SERVICE) as DisplayManager).getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION).firstOrNull()

        /** Creates and shows the presentation when the terminal has a customer screen; returns null otherwise. */
        fun <T> showIfAvailable(context: Context, owner: T, controller: CustomerDisplayController, fonts: AsteriskFonts = AsteriskFonts(), dark: Boolean = true): CustomerPresentation<T>?
            where T : LifecycleOwner, T : SavedStateRegistryOwner =
            customerDisplay(context)?.let { CustomerPresentation(context, it, owner, controller, fonts, dark).also { p -> p.show() } }
    }
}

/** True when the system has animations turned off; pass it to AsteriskTheme(reduceMotion = …). */
fun systemReduceMotion(context: Context): Boolean =
    Settings.Global.getFloat(context.contentResolver, Settings.Global.ANIMATOR_DURATION_SCALE, 1f) == 0f
