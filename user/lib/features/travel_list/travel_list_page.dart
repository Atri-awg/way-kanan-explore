import 'package:flutter/material.dart';
import 'package:user/core/theme/app_theme.dart'; 

class TravelListPage extends StatelessWidget {
  const TravelListPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Scaffold menggunakan AppColors.surface (warna latar terang "Desk")
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // KIRI: Sidebar (Desktop Navigation)
          const _DesktopSidebar(),
          
          // KANAN: Main Content Area
          Expanded(
            child: Column(
              children: [
                // Top Navigation Bar
                const _TopNavigationBar(),
                
                // Scrollable Content
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.xxxl, 
                      vertical: AppSpacing.xl
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Metrik Ekspedisi (Stats Cards)
                        const Row(
                          children: [
                            Expanded(
                              child: _MetricCard(
                                label: "CITIES VISITED",
                                value: "142",
                                subValue: "+12 this year",
                                showProgressBar: true,
                              ),
                            ),
                            SizedBox(width: AppSpacing.xl),
                            Expanded(
                              child: _MetricCard(
                                label: "AVG RATING GIVEN",
                                value: "4.8",
                                subValue: "Top 5% most discerning critics",
                                showIcon: Icons.star,
                              ),
                            ),
                            SizedBox(width: AppSpacing.xl),
                            Expanded(
                              child: _AchievementCard(),
                            ),
                          ],
                        ),
                        const SizedBox(height: 48),

                        // Bagian Arsip & Filter
                        const _ArchiveControlSection(),
                        const SizedBox(height: AppSpacing.xxl),

                        // Tabel Data Berdensitas Tinggi (No-Line Rule)
                        const _HighDensityArchiveList(),
                        const SizedBox(height: AppSpacing.xxxl),

                        // Load More Button
                        Center(
                          child: TextButton(
                            onPressed: () {},
                            style: TextButton.styleFrom(
                              backgroundColor: AppColors.surfaceContainerHigh,
                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(AppRadius.base),
                              ),
                            ),
                            child: Text(
                              "Load More Archives",
                              style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                color: AppColors.onSurface,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 64),
                        
                        // Footer
                        const _FooterSection(),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// KOMPONEN PRIVATE
// ============================================================================

class _DesktopSidebar extends StatelessWidget {
  const _DesktopSidebar();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 260,
      color: AppColors.surfaceContainerLowest, // "Index Card" surface
      child: Column(
        children: [
          const SizedBox(height: AppSpacing.xxl),
          // Logo Area
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xl),
            child: Text(
              "Way Kanan Explore",
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontStyle: FontStyle.italic,
                color: AppColors.primary,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xxxl),
          
          // User Profile Area
          const CircleAvatar(
            radius: 40,
            backgroundImage: NetworkImage('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'), 
          ),
          const SizedBox(height: AppSpacing.base),
          Text(
            "The Archivist",
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            "LEVEL 42 EXPLORER",
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: AppColors.secondary,
            ),
          ),
          const SizedBox(height: AppSpacing.xxxl),

          // Navigation Links
          const _SidebarItem(icon: Icons.dashboard_outlined, label: "Dashboard"),
          const _SidebarItem(icon: Icons.map, label: "Visited", isActive: true),
          const _SidebarItem(icon: Icons.layers_outlined, label: "Plan to Visit"),
          const _SidebarItem(icon: Icons.close, label: "Dropped"),
          const _SidebarItem(icon: Icons.bookmark_border, label: "Curated Lists"),
          
          const Spacer(),
          
          // CTA Button
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xl),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {},
                // Styling elevated button sudah diatur di AppTheme, tapi jika ingin override:
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: AppColors.onPrimary,
                  padding: const EdgeInsets.symmetric(vertical: 18),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.base)),
                  elevation: 0,
                ),
                child: Text(
                  "Log New Expedition",
                  style: Theme.of(context).textTheme.labelMedium?.copyWith(color: AppColors.onPrimary),
                ),
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xxl),
          
          // Bottom Actions
          const _SidebarItem(icon: Icons.help_outline, label: "SUPPORT", isSmall: true),
          const _SidebarItem(icon: Icons.logout, label: "SIGN OUT", isSmall: true),
          const SizedBox(height: AppSpacing.xxl),
        ],
      ),
    );
  }
}

class _SidebarItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final bool isSmall;

  const _SidebarItem({
    required this.icon,
    required this.label,
    this.isActive = false,
    this.isSmall = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: isActive ? AppColors.primary : Colors.transparent,
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xl, vertical: AppSpacing.base),
      child: Row(
        children: [
          Icon(
            icon, 
            color: isActive ? AppColors.onPrimary : AppColors.secondary,
            size: isSmall ? 18 : 22,
          ),
          const SizedBox(width: AppSpacing.base),
          Text(
            isSmall ? label.toUpperCase() : label,
            style: isSmall 
              ? Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: AppColors.secondary,
                )
              : Theme.of(context).textTheme.labelMedium?.copyWith(
                  color: isActive ? AppColors.onPrimary : AppColors.onSurface,
                ),
          ),
        ],
      ),
    );
  }
}

class _TopNavigationBar extends StatelessWidget {
  const _TopNavigationBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xxxl, vertical: AppSpacing.xl),
      color: AppColors.surface,
      child: Row(
        children: [
          const _TopNavLink(label: "Discover"),
          const _TopNavLink(label: "Rankings"),
          const _TopNavLink(label: "Archive", isActive: true),
          const _TopNavLink(label: "Community"),
          const Spacer(),
          IconButton(
            icon: const Icon(Icons.notifications_none, color: AppColors.onSurface), 
            onPressed: () {}
          ),
          IconButton(
            icon: const Icon(Icons.settings_outlined, color: AppColors.onSurface), 
            onPressed: () {}
          ),
          const SizedBox(width: AppSpacing.base),
          const CircleAvatar(
            radius: 16,
            backgroundColor: AppColors.surfaceContainerHigh,
            child: Icon(Icons.person_outline, size: 18, color: AppColors.onSurface),
          ),
        ],
      ),
    );
  }
}

class _TopNavLink extends StatelessWidget {
  final String label;
  final bool isActive;

  const _TopNavLink({required this.label, this.isActive = false});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: AppSpacing.xxl),
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelMedium?.copyWith(
          color: isActive ? AppColors.primary : AppColors.secondary,
          fontWeight: isActive ? FontWeight.bold : FontWeight.w600,
        ),
      ),
    );
  }
}

class _MetricCard extends StatelessWidget {
  final String label;
  final String value;
  final String subValue;
  final bool showProgressBar;
  final IconData? showIcon;

  const _MetricCard({
    required this.label,
    required this.value,
    required this.subValue,
    this.showProgressBar = false,
    this.showIcon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        color: AppColors.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(AppRadius.lg),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: AppColors.secondary,
            ),
          ),
          const SizedBox(height: AppSpacing.base),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                value,
                style: Theme.of(context).textTheme.displayMedium?.copyWith(
                  color: AppColors.primary,
                ),
              ),
              if (showIcon != null) ...[
                const SizedBox(width: AppSpacing.sm),
                Icon(showIcon, color: AppColors.tertiary, size: 24),
              ] else ...[
                const SizedBox(width: AppSpacing.sm),
                Text(
                  subValue,
                  style: Theme.of(context).textTheme.labelMedium?.copyWith(
                    color: AppColors.tertiary,
                  ),
                ),
              ]
            ],
          ),
          if (showIcon != null) ...[
            const SizedBox(height: AppSpacing.sm),
            Text(
              subValue, 
              style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.secondary),
            ),
          ],
          if (showProgressBar) ...[
            const SizedBox(height: AppSpacing.base),
            Container(
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.surfaceContainerHigh,
                borderRadius: BorderRadius.circular(2),
              ),
              child: FractionallySizedBox(
                alignment: Alignment.centerLeft,
                widthFactor: 0.65,
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _AchievementCard extends StatelessWidget {
  const _AchievementCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        color: AppColors.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(AppRadius.lg),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "ACHIEVEMENT BADGES",
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: AppColors.secondary,
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
          Row(
            children: [
              _Badge(color: Colors.lightGreen.shade200, icon: Icons.public),
              const SizedBox(width: AppSpacing.base),
              _Badge(color: Colors.orange.shade200, icon: Icons.verified),
              const SizedBox(width: AppSpacing.base),
              _Badge(color: Colors.lightBlue.shade200, icon: Icons.menu_book),
            ],
          ),
          const SizedBox(height: AppSpacing.base),
          Text(
            "4 badges away from 'Legend' status",
            style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.secondary),
          ),
        ],
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  final Color color;
  final IconData icon;

  const _Badge({required this.color, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
      child: Icon(icon, color: AppColors.onSurface, size: 24),
    );
  }
}

class _ArchiveControlSection extends StatelessWidget {
  const _ArchiveControlSection();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          "Visited",
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
            color: AppColors.primary,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(width: AppSpacing.xxl),
        Text(
          "Plan to Visit",
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
            color: AppColors.secondary,
          ),
        ),
        const SizedBox(width: AppSpacing.xxl),
        Text(
          "Dropped",
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
            color: AppColors.secondary,
          ),
        ),
        const Spacer(),
        SizedBox(
          width: 250,
          height: 40,
          child: TextField(
            decoration: InputDecoration(
              prefixIcon: const Icon(Icons.search, size: 18),
              hintText: "Search archive...",
              // InputDecorationTheme sudah diatur di AppTheme, ini hanya override spesifik
              filled: true,
              fillColor: AppColors.surfaceContainerLow, 
              contentPadding: const EdgeInsets.symmetric(vertical: 0),
            ),
          ),
        ),
        const SizedBox(width: AppSpacing.base),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base, vertical: 10),
          decoration: BoxDecoration(
            color: AppColors.surfaceContainerLow,
            borderRadius: BorderRadius.circular(AppRadius.base),
          ),
          child: Row(
            children: [
              const Icon(Icons.filter_list, size: 18, color: AppColors.onSurfaceVariant),
              const SizedBox(width: AppSpacing.sm),
              Text("Filter", style: Theme.of(context).textTheme.labelMedium),
            ],
          ),
        )
      ],
    );
  }
}

class _HighDensityArchiveList extends StatelessWidget {
  const _HighDensityArchiveList();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Table Header
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base, vertical: AppSpacing.md),
          child: Row(
            children: [
              Expanded(flex: 3, child: Text("DESTINATION", style: Theme.of(context).textTheme.labelSmall)),
              Expanded(flex: 2, child: Text("CATEGORY", style: Theme.of(context).textTheme.labelSmall)),
              Expanded(flex: 1, child: Text("YOUR RATING", style: Theme.of(context).textTheme.labelSmall)),
              Expanded(flex: 2, child: Text("COMMUNITY", style: Theme.of(context).textTheme.labelSmall)),
              Expanded(flex: 1, child: Text("DATE LOGGED", style: Theme.of(context).textTheme.labelSmall)),
            ],
          ),
        ),
        // Data Rows
        const _ArchiveRow(
          imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
          title: "Mount Rainier National Park",
          location: "Washington, USA",
          category: "NATURE",
          catColor: AppColors.tagNature, // Menggunakan warna tag dari design token
          rating: "5.0",
          communityRating: "4.9 (24k reviews)",
          date: "OCT 12, 2023",
        ),
        const _ArchiveRow(
          imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
          title: "Fushimi Inari-taisha",
          location: "Kyoto, Japan",
          category: "HISTORICAL",
          catColor: AppColors.tagHistorical,
          rating: "4.8",
          communityRating: "4.7 (82k reviews)",
          date: "SEP 04, 2023",
        ),
        const _ArchiveRow(
          imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
          title: "Red Square",
          location: "Moscow, Russia",
          category: "CULTURAL",
          catColor: AppColors.tagCultural,
          rating: "4.5",
          communityRating: "4.6 (55k reviews)",
          date: "AUG 22, 2023",
        ),
        const _ArchiveRow(
          imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
          title: "Berliner Dom",
          location: "Berlin, Germany",
          category: "ARCHITECTURE",
          catColor: AppColors.tagArchitecture,
          rating: "4.2",
          communityRating: "4.4 (12k reviews)",
          date: "JUL 15, 2023",
        ),
      ],
    );
  }
}

class _ArchiveRow extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String location;
  final String category;
  final Color catColor;
  final String rating;
  final String communityRating;
  final String date;

  const _ArchiveRow({
    required this.imageUrl,
    required this.title,
    required this.location,
    required this.category,
    required this.catColor,
    required this.rating,
    required this.communityRating,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      padding: const EdgeInsets.all(AppSpacing.base),
      decoration: BoxDecoration(
        color: AppColors.surfaceContainerLowest, // "Index Card"
        borderRadius: BorderRadius.circular(AppRadius.base),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Destination
          Expanded(
            flex: 3,
            child: Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(AppRadius.md),
                  child: Image.network(imageUrl, width: 48, height: 48, fit: BoxFit.cover),
                ),
                const SizedBox(width: AppSpacing.base),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: Theme.of(context).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                      const SizedBox(height: AppSpacing.xs),
                      Text(location, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.secondary)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          // Category
          Expanded(
            flex: 2,
            child: Align(
              alignment: Alignment.centerLeft,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: catColor.withAlpha(38),
                  borderRadius: BorderRadius.circular(AppRadius.lg),
                ),
                child: Text(
                  category,
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: catColor,
                    fontSize: 10,
                  ),
                ),
              ),
            ),
          ),
          // Rating
          Expanded(
            flex: 1,
            child: Row(
              children: [
                Text(rating, style: Theme.of(context).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                const SizedBox(width: AppSpacing.xs),
                const Icon(Icons.star, size: 14, color: AppColors.tertiary),
              ],
            ),
          ),
          // Community
          Expanded(
            flex: 2,
            child: Text(
              communityRating,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.onSurfaceVariant),
            ),
          ),
          // Date
          Expanded(
            flex: 1,
            child: Text(date, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.secondary)),
          ),
        ],
      ),
    );
  }
}

class _FooterSection extends StatelessWidget {
  const _FooterSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          "WAY KANAN EXPLORE",
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
            color: AppColors.secondary,
            letterSpacing: 2.0,
          ),
        ),
        const SizedBox(height: AppSpacing.xl),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("PRIVACY PROTOCOL", style: Theme.of(context).textTheme.labelSmall?.copyWith(decoration: TextDecoration.underline, color: AppColors.secondary)),
            const SizedBox(width: AppSpacing.xl),
            Text("EXPEDITION TERMS", style: Theme.of(context).textTheme.labelSmall?.copyWith(color: AppColors.secondary)),
            const SizedBox(width: AppSpacing.xl),
            Text("DATA SOURCES", style: Theme.of(context).textTheme.labelSmall?.copyWith(color: AppColors.secondary)),
            const SizedBox(width: AppSpacing.xl),
            Text("API ACCESS", style: Theme.of(context).textTheme.labelSmall?.copyWith(color: AppColors.secondary)),
          ],
        ),
        const SizedBox(height: AppSpacing.xl),
        Text(
          "© 2026 WAY KANAN EXPLORE. DATA-DRIVEN EXPLORATION FOR THE MODERN DIGITAL ARCHIVIST.",
          style: Theme.of(context).textTheme.labelSmall?.copyWith(
            color: AppColors.secondary,
            fontSize: 9,
          ),
        ),
      ],
    );
  }
}