package com.areeba.asterisk.compose

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.ImageComposeScene
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.platform.Font
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.dp
import org.jetbrains.skia.EncodedImageFormat
import java.io.File
import kotlin.test.Test
import kotlin.test.assertTrue

/** Renders every card-machine screen in light, dark and Arabic to build/shots (look at them; CI keeps them as an artifact). */
class Screenshots {
    private val fontDir = File(System.getProperty("asterisk.fonts") ?: "../../../fonts")
    private fun family(name: String, weights: List<Int>) = FontFamily(weights.map { w -> Font("$name-$w", File(fontDir, "$name-$w.woff2").readBytes(), FontWeight(w)) })
    private val fonts by lazy {
        AsteriskFonts(sans = family("PlusJakartaSans", listOf(400, 500, 600, 700)), arabic = family("IBMPlexSansArabic", listOf(400, 500, 600, 700)), mono = family("IBMPlexMono", listOf(400)))
    }
    private val out = File(System.getProperty("asterisk.shots") ?: "build/shots").apply { mkdirs() }

    private fun shot(name: String, wDp: Int, hDp: Int, content: @Composable () -> Unit) {
        for ((suffix, dark, locale) in listOf(Triple("light", false, "en"), Triple("dark", true, "en"), Triple("ar", false, "ar"), Triple("ar-dark", true, "ar"))) {
            val scene = ImageComposeScene(wDp * 2, hDp * 2, Density(2f)) {
                AsteriskTheme(dark = dark, locale = locale, fonts = fonts, reduceMotion = true) {
                    Box(Modifier.fillMaxSize().background(Asterisk.colors.surface)) { content() }
                }
            }
            val bytes = scene.render(0).encodeToData(EncodedImageFormat.PNG)!!.bytes
            scene.close()
            File(out, "$name-$suffix.png").writeBytes(bytes)
            assertTrue(bytes.size > 5_000, "$name-$suffix rendered")
        }
    }

    @Composable private fun ar() = Asterisk.theme.arabic
    @Composable private fun t(en: String, ar: String) = if (ar()) ar else en

    @Test fun merchantScreens() {
        shot("sale-amount", 360, 640) {
            Column(Modifier.fillMaxSize()) {
                TerminalHeader(t("Green Grocer", "البقالة الخضراء"), terminalId = "T-0142 7781")
                Spacer(Modifier.weight(1f))
                AmountDisplay(formatAmount("24.50"), label = t("Sale", "بيع"), hint = t("Card or phone", "بطاقة أو هاتف"))
                Spacer(Modifier.weight(1f))
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Keypad({}, decimal = true)
                    Button(t("Charge $24.50", "تحصيل ⁦$24.50⁩"), {}, size = ButtonSize.Lg, block = true)
                }
            }
        }
        shot("sale-card", 360, 640) {
            Column(Modifier.fillMaxSize()) {
                TerminalHeader(t("Green Grocer", "البقالة الخضراء"), terminalId = "T-0142 7781", printerReady = false)
                Box(Modifier.weight(1f).fillMaxWidth(), contentAlignment = androidx.compose.ui.Alignment.Center) { CardPrompt("24.50") }
                Column(Modifier.padding(16.dp)) { Button(t("Cancel sale", "إلغاء البيع"), {}, variant = ButtonVariant.Secondary, size = ButtonSize.Lg, block = true) }
            }
        }
        shot("sale-pin", 360, 640) {
            Column(Modifier.fillMaxSize().padding(24.dp), horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(24.dp, androidx.compose.ui.Alignment.CenterVertically)) {
                AmountDisplay("24.50", large = false, label = t("Amount", "المبلغ"))
                AText(t("Customer is entering their PIN", "العميل يُدخل الرقم السري"), variant = TextVariant.H3, weight = 600)
                PinDots(2)
                PinDots(4, error = t("Wrong PIN. 2 tries left.", "رقم سري خاطئ. بقيت محاولتان."))
                PaymentStep(t("Processing…", "جارٍ المعالجة…"))
            }
        }
        shot("sale-result", 360, 640) {
            Column(Modifier.fillMaxSize().padding(16.dp)) {
                PaymentResult(ResultTone.Approved, t("Payment approved", "تمت الموافقة على الدفع"), Modifier.fillMaxWidth(), amount = "24.50")
                DetailList(listOf(
                    Detail(t("Card", "البطاقة"), "VISA •••• 1395", ltr = true), Detail(t("Auth code", "رمز الموافقة"), "A1B2C3", ltr = true),
                    Detail(t("Reference", "المرجع"), "000421", ltr = true), Detail(t("Total", "المجموع"), "$24.50", ltr = true, emphasis = true),
                ))
                Spacer(Modifier.weight(1f))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(t("Receipt", "الإيصال"), {}, Modifier.weight(1f), variant = ButtonVariant.Secondary, icon = "printer")
                    Button(t("New sale", "بيع جديد"), {}, Modifier.weight(1f))
                }
            }
        }
        shot("history", 360, 640) {
            Column(Modifier.fillMaxSize()) {
                TerminalHeader(t("Green Grocer", "البقالة الخضراء"), terminalId = "T-0142 7781", online = false, end = { IconButton("search", t("Search", "بحث"), {}, plain = true) })
                Banner(t("Offline", "غير متصل"), Modifier.padding(16.dp), message = t("Sales are saved and sent when the terminal reconnects.", "تُحفظ المبيعات وتُرسل عند عودة الاتصال."), tone = Tone.Warning)
                TransactionRow(t("Sale", "بيع"), "$24.50", subtitle = t("Today, 09:32 · VISA 1395", "اليوم، 09:32 · VISA 1395"), status = t("Approved", "مقبولة"), statusTone = Tone.Success, onClick = {})
                TransactionRow(t("Refund", "استرداد"), "−$8.00", subtitle = t("Today, 09:10 · Mastercard 4821", "اليوم، 09:10 · Mastercard 4821"), status = t("Refunded", "مستردة"), icon = "transfer", onClick = {})
                TransactionRow(t("Sale", "بيع"), "$112.00", subtitle = t("Yesterday, 18:44 · VISA 0027", "أمس، 18:44 · VISA 0027"), status = t("Declined", "مرفوضة"), statusTone = Tone.Danger, onClick = {})
                TransactionRow(t("Sale", "بيع"), "$6.75", subtitle = t("Yesterday, 18:02 · Apple Pay", "أمس، 18:02 · Apple Pay"), status = t("Pending", "قيد الإرسال"), statusTone = Tone.Warning, onClick = {})
            }
        }
    }

    @Test fun customerDisplay() {
        shot("customer-basket", 640, 400) {
            CustomerDisplay(CustomerScreen.Basket(listOf(
                Detail(t("Olive oil 1L", "زيت زيتون ١ لتر"), "$12.00", ltr = true), Detail(t("Bread", "خبز"), "$2.50", ltr = true),
                Detail(t("Tomatoes 1kg", "بندورة ١ كغ"), "$4.00", ltr = true), Detail(t("Za'atar", "زعتر"), "$6.00", ltr = true),
            ), total = "24.50"))
        }
        shot("customer-pay", 640, 400) { CustomerDisplay(CustomerScreen.Pay("24.50")) }
        shot("customer-pin", 640, 400) { CustomerDisplay(CustomerScreen.Step(t("Enter your PIN on the keypad", "أدخل الرقم السري على لوحة المفاتيح"), icon = "lock")) }
        shot("customer-declined", 640, 400) {
            CustomerDisplay(CustomerScreen.Result(ResultTone.Declined, t("Card declined", "رُفضت البطاقة"), t("Try another card or ask the cashier.", "جرّب بطاقة أخرى أو اسأل أمين الصندوق.")))
        }
        shot("customer-idle", 640, 400) { CustomerDisplay(CustomerScreen.Idle(t("Green Grocer", "البقالة الخضراء"))) }
    }
}
