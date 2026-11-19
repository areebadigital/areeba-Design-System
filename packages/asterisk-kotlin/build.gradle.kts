plugins { kotlin("jvm") version "2.0.21" apply false }
allprojects { group = "com.areeba.asterisk"; version = (findProperty("asteriskVersion") as String?) ?: "4.0.0" }
