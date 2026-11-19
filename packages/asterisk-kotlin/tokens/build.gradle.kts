import org.jetbrains.kotlin.gradle.dsl.JvmTarget
plugins { kotlin("jvm"); `maven-publish` }
java { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
kotlin { compilerOptions { jvmTarget.set(JvmTarget.JVM_17) } }
dependencies { testImplementation(kotlin("test")) }
tasks.test { useJUnitPlatform() }
publishing {
    publications { create<MavenPublication>("tokens") { artifactId = "asterisk-tokens"; from(components["java"]) } }
    repositories {
        // GitHub Packages (Maven). CI sets GITHUB_ACTOR and GITHUB_TOKEN; change the URL to areeba's own registry if it has one.
        maven { name = "GitHubPackages"; url = uri("https://maven.pkg.github.com/areebadigital/areeba-Design-System")
            credentials { username = System.getenv("GITHUB_ACTOR"); password = System.getenv("GITHUB_TOKEN") } }
    }
}
