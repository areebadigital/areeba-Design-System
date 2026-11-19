plugins {
    kotlin("jvm") version "2.0.21" apply false
    kotlin("multiplatform") version "2.0.21" apply false
    kotlin("plugin.compose") version "2.0.21" apply false
    id("org.jetbrains.compose") version "1.7.3" apply false
    id("com.android.library") version "8.7.3" apply false
}
allprojects { group = "com.areeba.asterisk"; version = (findProperty("asteriskVersion") as String?) ?: "4.0.0" }
