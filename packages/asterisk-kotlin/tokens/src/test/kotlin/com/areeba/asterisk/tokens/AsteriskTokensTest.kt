package com.areeba.asterisk.tokens

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class AsteriskTokensTest {
    @Test fun brandIsCrimsonInLightAndChalkInDark() {
        assertEquals(0xFF630C0C, AsteriskTokens.Light.brand)
        assertEquals(0xFFF3F2EF, AsteriskTokens.Dark.brand)
    }
    @Test fun motionScaleIsOrdered() {
        with(AsteriskTokens.Motion) { assertTrue(DurationInstant < DurationFast && DurationFast < DurationBase && DurationBase < DurationSlow) }
    }
    @Test fun spacingIsOnTheFourPointGrid() {
        listOf(AsteriskTokens.Space.S1, AsteriskTokens.Space.S2, AsteriskTokens.Space.S4).forEach { assertEquals(0, it % 4) }
    }
}
