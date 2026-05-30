import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

// =============================================================================
// WAY KANAN EXPLORE — DESIGN SYSTEM: "THE DIGITAL ARCHIVIST"
// Implemented from DESIGN.md — Organic Editorialism
// =============================================================================

class AppColors {
  AppColors._();

  // ── Core Brand Palette ────────────────────────────────────────────────────
  static const Color primary = Color(0xFF063607); // Deep Forest
  static const Color onPrimary = Color(0xFFFFFFFF);
  static const Color primaryContainer = Color(0xFF204D1B);
  static const Color onPrimaryContainer = Color(0xFFB7F0A0);

  static const Color secondary = Color(0xFF4C616C); // Slate Mist
  static const Color onSecondary = Color(0xFFFFFFFF);
  static const Color secondaryContainer = Color(0xFFCFE6F2);
  static const Color onSecondaryContainer = Color(0xFF081E27);

  static const Color tertiary = Color(0xFF4E2013); // Clay Earth
  static const Color onTertiary = Color(0xFFFFFFFF);
  static const Color tertiaryContainer = Color(0xFF6B3322);
  static const Color onTertiaryContainer = Color(0xFFFFDBCF);
  static const Color tertiaryFixed = Color(0xFF7A3A22); // Clay accent for hover

  // ── Neutral Surfaces (Tonal Layering) ────────────────────────────────────
  // Principle: surface (Desk) > surface-container-low (Journal) > surface-container-lowest (Index Card)
  static const Color surface = Color(0xFFF8F9FA); // "The Desk"
  static const Color onSurface = Color(0xFF191C1D); // Premium ink, never pure black
  static const Color surfaceContainerLowest = Color(0xFFFFFFFF); // "Index Card"
  static const Color surfaceContainerLow = Color(0xFFF1F3F4); // "Journal"
  static const Color surfaceContainer = Color(0xFFEBEDEE);
  static const Color surfaceContainerHigh = Color(0xFFE5E7E8);
  static const Color surfaceContainerHighest = Color(0xFFE1E3E4);
  static const Color onSurfaceVariant = Color(0xFF414749);
  static const Color outlineVariant = Color(0xFFC1C7C9); // Used at 15% opacity

  // ── Dark Mode Palette ─────────────────────────────────────────────────────
  static const Color primaryDark = Color(0xFF9DD88A);
  static const Color onPrimaryDark = Color(0xFF0A3D07);
  static const Color primaryContainerDark = Color(0xFF1A3D16);
  static const Color onPrimaryContainerDark = Color(0xFFB7F0A0);

  static const Color secondaryDark = Color(0xFFB3CAD6);
  static const Color onSecondaryDark = Color(0xFF1D333D);
  static const Color secondaryContainerDark = Color(0xFF344A54);
  static const Color onSecondaryContainerDark = Color(0xFFCFE6F2);

  static const Color tertiaryDark = Color(0xFFFFB59B);
  static const Color onTertiaryDark = Color(0xFF5C1A07);
  static const Color tertiaryContainerDark = Color(0xFF7A3A22);

  static const Color surfaceDark = Color(0xFF191C1D);
  static const Color onSurfaceDark = Color(0xFFE1E3E4);
  static const Color surfaceContainerLowestDark = Color(0xFF0E1011);
  static const Color surfaceContainerLowDark = Color(0xFF212425);
  static const Color surfaceContainerDark = Color(0xFF252829);
  static const Color surfaceContainerHighDark = Color(0xFF2F3233);
  static const Color surfaceContainerHighestDark = Color(0xFF3A3D3E);
  static const Color onSurfaceVariantDark = Color(0xFFC1C7C9);

  // ── Semantic / Functional ─────────────────────────────────────────────────
  static const Color error = Color(0xFFBA1A1A);
  static const Color onError = Color(0xFFFFFFFF);
  static const Color errorContainer = Color(0xFFFFDAD6);

  static const Color success = Color(0xFF1B6E31);
  static const Color warning = Color(0xFF7B5800);

  // ── Category Tag Colors ───────────────────────────────────────────────────
  // Used for destination category chips (Nature, Historical, Cultural…)
  static const Color tagNature = Color(0xFF063607);
  static const Color tagHistorical = Color(0xFF4E2013);
  static const Color tagCultural = Color(0xFF4C616C);
  static const Color tagArchitecture = Color(0xFF1A4E5C);
  static const Color tagAdventure = Color(0xFF4A3000);

  // ── Gradient & Glassmorphism ──────────────────────────────────────────────
  static const LinearGradient primaryCTA = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    transform: GradientRotation(135 * 3.1415926 / 180),
    colors: [primary, primaryContainer],
  );

  static const Color glassSurface = Color(0xB3F8F9FA); // surface @ 70% opacity
  static const Color ambientShadow = Color(0x14063607); // rgba(6,54,7,0.08)
}

// =============================================================================
// TYPOGRAPHY — Editorial Authority
// Display/Headline: Manrope | Title/Body: Work Sans | Labels: Inter
// =============================================================================

class AppTypography {
  AppTypography._();

  static TextTheme buildTextTheme({bool isDark = false}) {
    final Color textColor =
        isDark ? AppColors.onSurfaceDark : AppColors.onSurface;
    final Color variantColor =
        isDark ? AppColors.onSurfaceVariantDark : AppColors.onSurfaceVariant;

    return TextTheme(
      // ── Display (Manrope) — Hero destination names, massive scale ──────
      displayLarge: GoogleFonts.manrope(
        fontSize: 57,
        fontWeight: FontWeight.w800,
        letterSpacing: -0.25,
        height: 1.12,
        color: textColor,
      ),
      displayMedium: GoogleFonts.manrope(
        fontSize: 45,
        fontWeight: FontWeight.w700,
        letterSpacing: 0,
        height: 1.16,
        color: textColor,
      ),
      displaySmall: GoogleFonts.manrope(
        // "Stats-Bar" number: e.g. "142 Countries"
        fontSize: 36,
        fontWeight: FontWeight.w700,
        letterSpacing: 0,
        height: 1.22,
        color: textColor,
      ),

      // ── Headline (Manrope) — Section headers, card titles ────────────
      headlineLarge: GoogleFonts.manrope(
        fontSize: 32,
        fontWeight: FontWeight.w700,
        letterSpacing: 0,
        height: 1.25,
        color: textColor,
      ),
      headlineMedium: GoogleFonts.manrope(
        fontSize: 28,
        fontWeight: FontWeight.w600,
        letterSpacing: 0,
        height: 1.29,
        color: textColor,
      ),
      headlineSmall: GoogleFonts.manrope(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        letterSpacing: 0,
        height: 1.33,
        color: textColor,
      ),

      // ── Title (Work Sans) — High-density list titles ──────────────────
      titleLarge: GoogleFonts.workSans(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        letterSpacing: 0,
        height: 1.27,
        color: textColor,
      ),
      titleMedium: GoogleFonts.workSans(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.15,
        height: 1.50,
        color: textColor,
      ),
      titleSmall: GoogleFonts.workSans(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.1,
        height: 1.43,
        color: textColor,
      ),

      // ── Body (Work Sans) — High-density lists, descriptions ───────────
      bodyLarge: GoogleFonts.workSans(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.5,
        height: 1.50,
        color: textColor,
      ),
      bodyMedium: GoogleFonts.workSans(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.25,
        height: 1.43,
        color: textColor,
      ),
      bodySmall: GoogleFonts.workSans(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.4,
        height: 1.33,
        color: variantColor,
      ),

      // ── Label (Inter) — Instrument-panel data: ratings, coords, timestamps
      labelLarge: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.1,
        height: 1.43,
        color: textColor,
      ),
      labelMedium: GoogleFonts.inter(
        // Primary label: "0.05rem" letter-spacing → ~0.8px
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.8,
        height: 1.33,
        color: variantColor,
      ),
      labelSmall: GoogleFonts.inter(
        // Category chips, all-caps stats labels
        fontSize: 11,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
        height: 1.45,
        color: variantColor,
      ),
    );
  }
}

// =============================================================================
// MAIN THEME BUILDER
// =============================================================================

class AppTheme {
  AppTheme._();

  // ── Shared Component Themes ───────────────────────────────────────────────

  static ElevatedButtonThemeData _elevatedButtonTheme(bool isDark) {
    return ElevatedButtonThemeData(
      style: ButtonStyle(
        // Primary CTAs use the Forest→Container gradient (handled via custom widget)
        backgroundColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) {
            return (isDark
                    ? AppColors.surfaceContainerDark
                    : AppColors.surfaceContainer)
                .withAlpha(61);
          }
          return isDark ? AppColors.primaryDark : AppColors.primary;
        }),
        foregroundColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.disabled)) return AppColors.onSurfaceVariant;
          return isDark ? AppColors.onPrimaryDark : AppColors.onPrimary;
        }),
        elevation: WidgetStateProperty.all(0), // Tonal layering — no shadow CTA
        shadowColor: WidgetStateProperty.all(Colors.transparent),
        shape: WidgetStateProperty.all(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12), // xl = 0.75rem
          ),
        ),
        padding: WidgetStateProperty.all(
          const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        ),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.pressed)) {
            return AppColors.onPrimary.withAlpha(20);
          }
          return null;
        }),
      ),
    );
  }

  static OutlinedButtonThemeData _outlinedButtonTheme(bool isDark) {
    return OutlinedButtonThemeData(
      style: ButtonStyle(
        // Secondary: surface-container-high bg, on-surface text — "integrated" feel
        backgroundColor: WidgetStateProperty.all(
          isDark
              ? AppColors.surfaceContainerHighDark
              : AppColors.surfaceContainerHigh,
        ),
        foregroundColor: WidgetStateProperty.all(
          isDark ? AppColors.onSurfaceDark : AppColors.onSurface,
        ),
        side: WidgetStateProperty.all(BorderSide.none), // No-Line Rule
        elevation: WidgetStateProperty.all(0),
        shape: WidgetStateProperty.all(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        padding: WidgetStateProperty.all(
          const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        ),
      ),
    );
  }

  static TextButtonThemeData _textButtonTheme(bool isDark) {
    return TextButtonThemeData(
      style: ButtonStyle(
        // Tertiary: pure text in primary, Clay underline on hover
        foregroundColor: WidgetStateProperty.all(
          isDark ? AppColors.primaryDark : AppColors.primary,
        ),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.hovered)) {
            return AppColors.primary.withAlpha(15);
          }
          return null;
        }),
        padding: WidgetStateProperty.all(
          const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        ),
        shape: WidgetStateProperty.all(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
    );
  }

  static CardThemeData _cardTheme(bool isDark) {
    return CardThemeData(
      // Index Card: surface-container-lowest — "stacked fine paper" effect
      color: isDark
          ? AppColors.surfaceContainerLowestDark
          : AppColors.surfaceContainerLowest,
      elevation: 0, // No shadow — tonal layering only
      shadowColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16), // xl for cards
        side: BorderSide.none, // No-Line Rule
      ),
      margin: EdgeInsets.zero,
    );
  }

  static InputDecorationTheme _inputDecorationTheme(bool isDark) {
    return InputDecorationTheme(
      // Ghost Border: outline-variant at 15% opacity — "felt, not seen"
      filled: true,
      fillColor: isDark
          ? AppColors.surfaceContainerLowDark
          : AppColors.surfaceContainerLow,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6), // md = 0.375rem inputs
        borderSide: BorderSide(
          color: (isDark
                  ? AppColors.onSurfaceVariantDark
                  : AppColors.outlineVariant)
              .withAlpha(38), // 15% opacity
          width: 1,
        ),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: BorderSide(
          color: (isDark
                  ? AppColors.onSurfaceVariantDark
                  : AppColors.outlineVariant)
              .withAlpha(38),
          width: 1,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: BorderSide(
          color: isDark ? AppColors.primaryDark : AppColors.primary,
          width: 2,
        ),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: AppColors.error, width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: AppColors.error, width: 2),
      ),
      labelStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.8,
        color: isDark ? AppColors.onSurfaceVariantDark : AppColors.onSurfaceVariant,
      ),
      hintStyle: GoogleFonts.inter(
        fontSize: 14,
        color: (isDark
                ? AppColors.onSurfaceVariantDark
                : AppColors.onSurfaceVariant)
            .withAlpha(153),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    );
  }

  static CheckboxThemeData _checkboxTheme(bool isDark) {
    return CheckboxThemeData(
      // md = 0.375rem roundedness — "archival" squared corners
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(4),
      ),
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return isDark ? AppColors.primaryDark : AppColors.primary;
        }
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(
        isDark ? AppColors.onPrimaryDark : AppColors.onPrimary,
      ),
      side: BorderSide(
        color: isDark ? AppColors.onSurfaceVariantDark : AppColors.onSurfaceVariant,
        width: 1.5,
      ),
    );
  }

  static TabBarTheme _tabBarTheme(bool isDark) {
    return TabBarTheme(
      // No indicator border — underline only via labelStyle
      indicator: UnderlineTabIndicator(
        borderSide: BorderSide(
          color: isDark ? AppColors.primaryDark : AppColors.primary,
          width: 2,
        ),
        insets: const EdgeInsets.symmetric(horizontal: 0),
      ),
      indicatorSize: TabBarIndicatorSize.tab,
      labelColor: isDark ? AppColors.primaryDark : AppColors.primary,
      unselectedLabelColor:
          isDark ? AppColors.onSurfaceVariantDark : AppColors.onSurfaceVariant,
      labelStyle: GoogleFonts.workSans(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.1,
      ),
      unselectedLabelStyle: GoogleFonts.workSans(
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      dividerColor: Colors.transparent, // No-Line Rule
    );
  }

  static AppBarTheme _appBarTheme(bool isDark) {
    return AppBarTheme(
      // Glassmorphism nav: surface @ 70% + 20px blur (applied in widgets)
      backgroundColor:
          (isDark ? AppColors.surfaceDark : AppColors.surface).withAlpha(179),
      foregroundColor: isDark ? AppColors.onSurfaceDark : AppColors.onSurface,
      elevation: 0,
      scrolledUnderElevation: 0,
      shadowColor: Colors.transparent,
      surfaceTintColor: Colors.transparent,
      centerTitle: false,
      titleTextStyle: GoogleFonts.manrope(
        fontSize: 20,
        fontWeight: FontWeight.w700,
        letterSpacing: 0,
        color: isDark ? AppColors.primaryDark : AppColors.primary,
      ),
      iconTheme: IconThemeData(
        color: isDark ? AppColors.onSurfaceDark : AppColors.onSurface,
        size: 22,
      ),
      systemOverlayStyle: isDark
          ? SystemUiOverlayStyle.light
          : SystemUiOverlayStyle.dark,
    );
  }

  static NavigationRailThemeData _navRailTheme(bool isDark) {
    return NavigationRailThemeData(
      backgroundColor:
          isDark ? AppColors.surfaceContainerLowDark : AppColors.surfaceContainerLow,
      selectedIconTheme: IconThemeData(
        color: isDark ? AppColors.primaryDark : AppColors.primary,
        size: 22,
      ),
      unselectedIconTheme: IconThemeData(
        color: isDark
            ? AppColors.onSurfaceVariantDark
            : AppColors.onSurfaceVariant,
        size: 22,
      ),
      selectedLabelTextStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.5,
        color: isDark ? AppColors.primaryDark : AppColors.primary,
      ),
      unselectedLabelTextStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.5,
        color: isDark
            ? AppColors.onSurfaceVariantDark
            : AppColors.onSurfaceVariant,
      ),
      indicatorColor:
          (isDark ? AppColors.primaryDark : AppColors.primary).withAlpha(26),
      elevation: 0,
      useIndicator: true,
      indicatorShape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      minWidth: 72,
      minExtendedWidth: 200,
    );
  }

  static BottomNavigationBarThemeData _bottomNavTheme(bool isDark) {
    return BottomNavigationBarThemeData(
      backgroundColor: isDark ? AppColors.surfaceDark : AppColors.surface,
      selectedItemColor: isDark ? AppColors.primaryDark : AppColors.primary,
      unselectedItemColor:
          isDark ? AppColors.onSurfaceVariantDark : AppColors.onSurfaceVariant,
      selectedLabelStyle: GoogleFonts.inter(
        fontSize: 11,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.5,
      ),
      unselectedLabelStyle: GoogleFonts.inter(
        fontSize: 11,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.5,
      ),
      elevation: 0,
      type: BottomNavigationBarType.fixed,
      showUnselectedLabels: true, // DESIGN.md: "Icons without labels = guessing games"
    );
  }

  static ChipThemeData _chipTheme(bool isDark) {
    return ChipThemeData(
      backgroundColor: isDark
          ? AppColors.surfaceContainerHighDark
          : AppColors.surfaceContainerHigh,
      labelStyle: GoogleFonts.inter(
        fontSize: 11,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(6), // md = archival feel
        side: BorderSide.none, // No-Line Rule
      ),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      elevation: 0,
      pressElevation: 0,
    );
  }

  static DividerThemeData _dividerTheme() {
    // "No-Line Rule" — dividers are transparent; use background shifts instead
    return const DividerThemeData(
      color: Colors.transparent,
      thickness: 0,
      space: 40, // 40px vertical gap per DESIGN.md
    );
  }

  static ScrollbarThemeData _scrollbarTheme(bool isDark) {
    return ScrollbarThemeData(
      thumbColor: WidgetStateProperty.all(
        (isDark ? AppColors.onSurfaceVariantDark : AppColors.onSurfaceVariant)
            .withAlpha(77),
      ),
      trackColor: WidgetStateProperty.all(Colors.transparent),
      radius: const Radius.circular(4),
      thickness: WidgetStateProperty.all(3),
    );
  }

  static ProgressIndicatorThemeData _progressTheme(bool isDark) {
    return ProgressIndicatorThemeData(
      // Stats-Bar: surface-container-highest track, primary fill
      color: isDark ? AppColors.primaryDark : AppColors.primary,
      linearTrackColor: isDark
          ? AppColors.surfaceContainerHighestDark
          : AppColors.surfaceContainerHighest,
      linearMinHeight: 6,
      circularTrackColor: isDark
          ? AppColors.surfaceContainerHighestDark
          : AppColors.surfaceContainerHighest,
    );
  }

  static FloatingActionButtonThemeData _fabTheme(bool isDark) {
    return FloatingActionButtonThemeData(
      // "Add Review" FAB: ambient green-tinted shadow
      backgroundColor: isDark ? AppColors.primaryDark : AppColors.primary,
      foregroundColor: isDark ? AppColors.onPrimaryDark : AppColors.onPrimary,
      elevation: 0,
      focusElevation: 4,
      hoverElevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      // Shadow applied via BoxDecoration in custom FAB widget:
      // color: rgba(6,54,7,0.08), blur: 32, y-offset: 16
    );
  }

  // ── LIGHT THEME ───────────────────────────────────────────────────────────
  static ThemeData get light {
    const bool isDark = false;
    final textTheme = AppTypography.buildTextTheme(isDark: isDark);

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: const ColorScheme(
        brightness: Brightness.light,
        primary: AppColors.primary,
        onPrimary: AppColors.onPrimary,
        primaryContainer: AppColors.primaryContainer,
        onPrimaryContainer: AppColors.onPrimaryContainer,
        secondary: AppColors.secondary,
        onSecondary: AppColors.onSecondary,
        secondaryContainer: AppColors.secondaryContainer,
        onSecondaryContainer: AppColors.onSecondaryContainer,
        tertiary: AppColors.tertiary,
        onTertiary: AppColors.onTertiary,
        tertiaryContainer: AppColors.tertiaryContainer,
        onTertiaryContainer: AppColors.onTertiaryContainer,
        error: AppColors.error,
        onError: AppColors.onError,
        errorContainer: AppColors.errorContainer,
        onErrorContainer: Color(0xFF410002),
        surface: AppColors.surface,
        onSurface: AppColors.onSurface,
        onSurfaceVariant: AppColors.onSurfaceVariant,
        outline: AppColors.outlineVariant,
        outlineVariant: AppColors.outlineVariant,
        shadow: Colors.transparent, // Tonal layering: no shadows
        inverseSurface: AppColors.onSurface,
        onInverseSurface: AppColors.surface,
        inversePrimary: AppColors.primaryDark,
        surfaceTint: AppColors.primary,
        scrim: Color(0x80000000),
      ),
      scaffoldBackgroundColor: AppColors.surface,
      textTheme: textTheme,
      primaryTextTheme: textTheme,
      // Components
      appBarTheme: _appBarTheme(isDark),
      elevatedButtonTheme: _elevatedButtonTheme(isDark),
      outlinedButtonTheme: _outlinedButtonTheme(isDark),
      textButtonTheme: _textButtonTheme(isDark),
      cardTheme: _cardTheme(isDark),
      inputDecorationTheme: _inputDecorationTheme(isDark),
      checkboxTheme: _checkboxTheme(isDark),
      tabBarTheme: _tabBarTheme(isDark),
      chipTheme: _chipTheme(isDark),
      dividerTheme: _dividerTheme(),
      scrollbarTheme: _scrollbarTheme(isDark),
      progressIndicatorTheme: _progressTheme(isDark),
      floatingActionButtonTheme: _fabTheme(isDark),
      navigationRailTheme: _navRailTheme(isDark),
      bottomNavigationBarTheme: _bottomNavTheme(isDark),
      // Global overrides
      splashColor: AppColors.primary.withAlpha(20),
      highlightColor: AppColors.primary.withAlpha(10),
      focusColor: AppColors.primary.withAlpha(15),
      hoverColor: AppColors.primary.withAlpha(10),
      visualDensity: VisualDensity.adaptivePlatformDensity,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: CupertinoPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
          TargetPlatform.macOS: CupertinoPageTransitionsBuilder(),
          TargetPlatform.windows: CupertinoPageTransitionsBuilder(),
          TargetPlatform.linux: CupertinoPageTransitionsBuilder(),
        },
      ),
    );
  }

  // ── DARK THEME ────────────────────────────────────────────────────────────
  static ThemeData get dark {
    const bool isDark = true;
    final textTheme = AppTypography.buildTextTheme(isDark: isDark);

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: const ColorScheme(
        brightness: Brightness.dark,
        primary: AppColors.primaryDark,
        onPrimary: AppColors.onPrimaryDark,
        primaryContainer: AppColors.primaryContainerDark,
        onPrimaryContainer: AppColors.onPrimaryContainerDark,
        secondary: AppColors.secondaryDark,
        onSecondary: AppColors.onSecondaryDark,
        secondaryContainer: AppColors.secondaryContainerDark,
        onSecondaryContainer: AppColors.onSecondaryContainerDark,
        tertiary: AppColors.tertiaryDark,
        onTertiary: AppColors.onTertiaryDark,
        tertiaryContainer: AppColors.tertiaryContainerDark,
        onTertiaryContainer: AppColors.onTertiaryContainer,
        error: Color(0xFFFFB4AB),
        onError: Color(0xFF690005),
        errorContainer: Color(0xFF93000A),
        onErrorContainer: Color(0xFFFFDAD6),
        surface: AppColors.surfaceDark,
        onSurface: AppColors.onSurfaceDark,
        onSurfaceVariant: AppColors.onSurfaceVariantDark,
        outline: AppColors.onSurfaceVariantDark,
        outlineVariant: AppColors.surfaceContainerHighestDark,
        shadow: Colors.transparent,
        inverseSurface: AppColors.onSurfaceDark,
        onInverseSurface: AppColors.surfaceDark,
        inversePrimary: AppColors.primary,
        surfaceTint: AppColors.primaryDark,
        scrim: Color(0x80000000),
      ),
      scaffoldBackgroundColor: AppColors.surfaceDark,
      textTheme: textTheme,
      primaryTextTheme: textTheme,
      // Components
      appBarTheme: _appBarTheme(isDark),
      elevatedButtonTheme: _elevatedButtonTheme(isDark),
      outlinedButtonTheme: _outlinedButtonTheme(isDark),
      textButtonTheme: _textButtonTheme(isDark),
      cardTheme: _cardTheme(isDark),
      inputDecorationTheme: _inputDecorationTheme(isDark),
      checkboxTheme: _checkboxTheme(isDark),
      tabBarTheme: _tabBarTheme(isDark),
      chipTheme: _chipTheme(isDark),
      dividerTheme: _dividerTheme(),
      scrollbarTheme: _scrollbarTheme(isDark),
      progressIndicatorTheme: _progressTheme(isDark),
      floatingActionButtonTheme: _fabTheme(isDark),
      navigationRailTheme: _navRailTheme(isDark),
      bottomNavigationBarTheme: _bottomNavTheme(isDark),
      splashColor: AppColors.primaryDark.withAlpha(20),
      highlightColor: AppColors.primaryDark.withAlpha(10),
      focusColor: AppColors.primaryDark.withAlpha(15),
      hoverColor: AppColors.primaryDark.withAlpha(10),
      visualDensity: VisualDensity.adaptivePlatformDensity,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: CupertinoPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
          TargetPlatform.macOS: CupertinoPageTransitionsBuilder(),
          TargetPlatform.windows: CupertinoPageTransitionsBuilder(),
          TargetPlatform.linux: CupertinoPageTransitionsBuilder(),
        },
      ),
    );
  }
}

// =============================================================================
// DESIGN TOKENS — Convenience constants for use throughout the codebase
// =============================================================================

class AppSpacing {
  AppSpacing._();

  // Journal gutter — asymmetrical left margin for editorial tension
  static const double gutterLeft = 32.0;
  static const double gutterRight = 20.0;

  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 12.0;
  static const double base = 16.0;
  static const double lg = 20.0;
  static const double xl = 24.0;
  static const double xxl = 32.0;
  static const double xxxl = 40.0; // Section separator (No-Line Rule: 40px gap)
  static const double section = 56.0;
}

class AppRadius {
  AppRadius._();

  static const double sm = 4.0; // Input ghost borders
  static const double md = 6.0; // md = 0.375rem — inputs, checkboxes
  static const double base = 8.0;
  static const double lg = 12.0;
  static const double xl = 16.0; // xl = 0.75rem — cards, primary CTAs
  static const double xxl = 24.0;
  static const double full = 999.0;
}

class AppShadows {
  AppShadows._();

  /// Ambient FAB shadow — tinted with primary green per DESIGN.md
  static List<BoxShadow> get fab => [
        BoxShadow(
          color: AppColors.ambientShadow,
          blurRadius: 32,
          offset: const Offset(0, 16),
        ),
      ];

  /// Subtle card lift — used sparingly for interactive elements
  static List<BoxShadow> get card => [
        BoxShadow(
          color: AppColors.ambientShadow.withAlpha(10),
          blurRadius: 16,
          offset: const Offset(0, 8),
        ),
      ];
}