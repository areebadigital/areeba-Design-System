// Compose components for areeba card machines (Android POS terminals, touch screens, some with a customer display)
// and Android apps. Shared Compose code (commonMain) builds for Android and, for screenshot tests, for the JVM.
// The Android target is added when an Android SDK is present (ANDROID_HOME, or sdk.dir in local.properties), as on CI.
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import java.util.Properties

plugins { kotlin("multiplatform"); kotlin("plugin.compose"); id("org.jetbrains.compose"); `maven-publish` }

val localSdk = rootProject.file("local.properties").takeIf { it.exists() }?.let { f -> Properties().apply { f.inputStream().use { load(it) } }.getProperty("sdk.dir") }
val hasAndroidSdk = listOfNotNull(System.getenv("ANDROID_HOME"), System.getenv("ANDROID_SDK_ROOT"), localSdk).any { file(it).isDirectory }
if (hasAndroidSdk) apply(plugin = "com.android.library")

kotlin {
    jvm { compilerOptions { jvmTarget.set(JvmTarget.JVM_17) } }
    if (hasAndroidSdk) androidTarget { publishLibraryVariants("release"); compilerOptions { jvmTarget.set(JvmTarget.JVM_17) } }
    sourceSets {
        commonMain.dependencies {
            api(project(":tokens"))
            api(compose.runtime); api(compose.foundation); api(compose.ui)
        }
        if (hasAndroidSdk) androidMain.dependencies { implementation("androidx.lifecycle:lifecycle-runtime:2.8.7"); implementation("androidx.savedstate:savedstate:1.2.1") }
        val jvmTest by getting { dependencies { implementation(kotlin("test")); implementation(compose.desktop.currentOs) } }
    }
}

if (hasAndroidSdk) extensions.configure<com.android.build.gradle.LibraryExtension>("android") {
    namespace = "com.areeba.asterisk.compose"
    compileSdk = 35
    defaultConfig { minSdk = 24 }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
}

tasks.withType<Test>().configureEach { useJUnitPlatform(); systemProperty("asterisk.shots", layout.buildDirectory.dir("shots").get().asFile.path); systemProperty("asterisk.fonts", rootProject.file("../../fonts").path) }

publishing {
    publications.withType<MavenPublication>().configureEach { artifactId = artifactId.replace("compose", "asterisk-compose") }
    repositories {
        maven { name = "GitHubPackages"; url = uri("https://maven.pkg.github.com/areebadigital/areeba-Design-System")
            credentials { username = System.getenv("GITHUB_ACTOR"); password = System.getenv("GITHUB_TOKEN") } }
    }
}
