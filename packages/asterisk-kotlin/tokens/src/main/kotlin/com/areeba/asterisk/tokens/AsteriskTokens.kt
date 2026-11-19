// areeba Asterisk tokens: generated from tokens.json by scripts/build-platform-tokens.mjs. Do not edit.
// Plain Kotlin with no dependencies. Colours are ARGB Longs, sizes are dp, type sizes are sp, durations are ms.
package com.areeba.asterisk.tokens

object AsteriskTokens {
    const val VERSION = "1"

    /** Colours for one theme, as ARGB (0xAARRGGBB). */
    interface Colors {
        val brand: Long
        val brandHover: Long
        val brandSoft: Long
        val onBrand: Long
        val accent: Long
        val night: Long
        val onNight: Long
        val mint: Long
        val surface: Long
        val surfaceSunken: Long
        val surfaceRaised: Long
        val surfaceField: Long
        val ink: Long
        val inkMuted: Long
        val inkDisabled: Long
        val line: Long
        val lineStrong: Long
        val focus: Long
        val success: Long
        val successSoft: Long
        val warning: Long
        val warningSoft: Long
        val danger: Long
        val dangerSoft: Long
        val info: Long
        val infoSoft: Long
        val chart1: Long
        val chart2: Long
        val chart3: Long
        val chart4: Long
        val chartGrid: Long
    }

    object Light : Colors {
        override val brand: Long = 0xFF630C0C
        override val brandHover: Long = 0xFF4A0909
        override val brandSoft: Long = 0xFFEFE7E7
        override val onBrand: Long = 0xFFFFFFFF
        override val accent: Long = 0xFFFF2929
        override val night: Long = 0xFF131210
        override val onNight: Long = 0xFFFFFFFF
        override val mint: Long = 0xFFC9F2E7
        override val surface: Long = 0xFFFFFFFF
        override val surfaceSunken: Long = 0xFFF3F2EF
        override val surfaceRaised: Long = 0xFFFFFFFF
        override val surfaceField: Long = 0xFFF3F2EF
        override val ink: Long = 0xFF131210
        override val inkMuted: Long = 0xCC131210
        override val inkDisabled: Long = 0xFFA8A59F
        override val line: Long = 0xFFE0DFDD
        override val lineStrong: Long = 0xFF8A8782
        override val focus: Long = 0xFF1D5FD6
        override val success: Long = 0xFF007612
        override val successSoft: Long = 0xFFE7F8E9
        override val warning: Long = 0xFFA64A05
        override val warningSoft: Long = 0xFFFFF3E0
        override val danger: Long = 0xFFD0121B
        override val dangerSoft: Long = 0xFFFDECEA
        override val info: Long = 0xFF1D5FD6
        override val infoSoft: Long = 0xFFE8F0FD
        override val chart1: Long = 0xFF630C0C
        override val chart2: Long = 0xFF2F6FE0
        override val chart3: Long = 0xFF0F9488
        override val chart4: Long = 0xFFC27C0E
        override val chartGrid: Long = 0xFFECEBE8
    }

    object Dark : Colors {
        override val brand: Long = 0xFFF3F2EF
        override val brandHover: Long = 0xFFFFFFFF
        override val brandSoft: Long = 0xFF2B1715
        override val onBrand: Long = 0xFF630C0C
        override val accent: Long = 0xFFFF2929
        override val night: Long = 0xFF1F1D1A
        override val onNight: Long = 0xFFF3F2EF
        override val mint: Long = 0xFF123A33
        override val surface: Long = 0xFF131210
        override val surfaceSunken: Long = 0xFF0C0B0A
        override val surfaceRaised: Long = 0xFF1F1D1A
        override val surfaceField: Long = 0xFF1F1D1A
        override val ink: Long = 0xFFF3F2EF
        override val inkMuted: Long = 0xCCF3F2EF
        override val inkDisabled: Long = 0xFF57534D
        override val line: Long = 0xFF2E2B27
        override val lineStrong: Long = 0xFF7A766F
        override val focus: Long = 0xFF7CA7F8
        override val success: Long = 0xFF34D399
        override val successSoft: Long = 0xFF0F2E24
        override val warning: Long = 0xFFFBBF24
        override val warningSoft: Long = 0xFF33240A
        override val danger: Long = 0xFFF97066
        override val dangerSoft: Long = 0xFF3A1210
        override val info: Long = 0xFF7CA7F8
        override val infoSoft: Long = 0xFF14233F
        override val chart1: Long = 0xFFF3F2EF
        override val chart2: Long = 0xFF4F86EC
        override val chart3: Long = 0xFF1AA898
        override val chart4: Long = 0xFFC2841C
        override val chartGrid: Long = 0xFF24221F
    }

    /** Spacing in dp. */
    object Space {
        const val S1: Int = 4
        const val S2: Int = 8
        const val S3: Int = 12
        const val S4: Int = 16
        const val S5: Int = 20
        const val S6: Int = 24
        const val S8: Int = 32
        const val S10: Int = 40
        const val S12: Int = 48
        const val S16: Int = 64
    }

    /** Corner radius in dp. */
    object Radius {
        const val Xs: Int = 4
        const val Sm: Int = 8
        const val Md: Int = 12
        const val Lg: Int = 16
        const val Xl: Int = 24
        const val Full: Int = 999
    }

    /** Control and icon sizes in dp. Touch targets are at least 48dp on card machines. */
    object Size {
        const val ControlSm: Int = 32
        const val ControlMd: Int = 44
        const val ControlLg: Int = 48
        const val Icon: Int = 24
        const val Tabbar: Int = 64
    }

    /** Motion: durations in ms, easing as cubic-bezier control points. Use 0 for every duration when animations are off. */
    object Motion {
        const val DurationInstant: Int = 100
        const val DurationFast: Int = 150
        const val DurationBase: Int = 250
        const val DurationSlow: Int = 400
        val EaseStandard: FloatArray = floatArrayOf(0.2f, 0f, 0f, 1f)
        val EaseEnter: FloatArray = floatArrayOf(0f, 0f, 0f, 1f)
        val EaseExit: FloatArray = floatArrayOf(0.3f, 0f, 1f, 1f)
        const val DistanceDp: Int = 8
    }

    /** A text style: size and line height in sp, weight 100–900, letter spacing in sp (0 for Arabic). */
    data class TextStyle(val fontSizeSp: Float, val lineHeightSp: Float, val fontWeight: Int, val letterSpacingSp: Float, val mono: Boolean, val tabularNums: Boolean)

    object Type {
        val DisplayXl = TextStyle(64f, 72f, 400, -1.92f, false, false)
        val DisplayLg = TextStyle(48f, 56f, 400, -1.92f, false, false)
        val Display = TextStyle(36f, 44f, 400, -0.72f, false, false)
        val H1 = TextStyle(30f, 38f, 400, -0.6f, false, false)
        val H2 = TextStyle(24f, 32f, 400, 0f, false, false)
        val H3 = TextStyle(20f, 30f, 400, 0f, false, false)
        val BodyLg = TextStyle(18f, 28f, 400, 0f, false, false)
        val Body = TextStyle(16f, 24f, 400, 0f, false, false)
        val BodySm = TextStyle(14f, 20f, 400, 0f, false, false)
        val Label = TextStyle(14f, 20f, 500, 0f, false, false)
        val Caption = TextStyle(12f, 18f, 400, 0f, false, false)
        val AmountXl = TextStyle(40f, 48f, 700, -0.8f, false, true)
        val Amount = TextStyle(17f, 24f, 600, 0f, false, true)
        val Code = TextStyle(13f, 20f, 400, 0f, true, true)
    }
}
