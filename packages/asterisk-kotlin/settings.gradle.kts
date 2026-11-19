// areeba Asterisk for Kotlin: tokens (plain Kotlin) and Compose components for card machines and Android apps.
pluginManagement { repositories { gradlePluginPortal(); google(); mavenCentral() } }
dependencyResolutionManagement { repositories { google(); mavenCentral() } }
rootProject.name = "asterisk-kotlin"
include(":tokens", ":compose")
