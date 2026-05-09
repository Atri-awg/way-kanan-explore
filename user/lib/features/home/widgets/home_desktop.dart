import 'package:flutter/material.dart';
import 'package:user/core/constants/app_assets.dart';
import 'package:user/core/constants/app_colors.dart';
import 'package:user/features/home/widgets/feature_card.dart';
import 'package:user/features/home/widgets/destination_card.dart';

class HomeDesktop extends StatelessWidget {
  const HomeDesktop({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Navbar
            _buildNavbar(context),
            
            // Hero Section
            _buildHeroSection(),
            
            // Feature Cards Section
            _buildFeaturesSection(),
            
            // Popular Destinations Section
            _buildPopularDestinationsSection(),
            
            // Footer spacing
            const SizedBox(height: 60),
          ],
        ),
      ),
    );
  }

  Widget _buildNavbar(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 80, vertical: 20),
      decoration: BoxDecoration(
        color: AppColors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          // Logo
          Image.asset(
            AppAssets.logo,
            height: 50,
            errorBuilder: (context, error, stackTrace) {
              return const Text(
                'Waykanan EXPLORE',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              );
            },
          ),
          const Spacer(),
          
          // Menu Items
          _buildNavItem('Beranda', isActive: true),
          _buildNavItem('Destinasi'),
          _buildNavItem('Tentang Way Kanan'),
          _buildNavItem('Artikel'),
          _buildNavItem('Galeri'),
          _buildNavItem('Kontak'),
          
          const SizedBox(width: 20),
          
          // CTA Button
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primaryDark,
              foregroundColor: AppColors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: Row(
              children: const [
                Text(
                  'Jelajahi Sekarang',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(width: 8),
                Icon(Icons.arrow_forward, size: 16),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(String title, {bool isActive = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: isActive ? FontWeight.w600 : FontWeight.w500,
              color: isActive ? AppColors.textBlack : AppColors.textGrey,
            ),
          ),
          if (isActive)
            Container(
              margin: const EdgeInsets.only(top: 4),
              height: 2,
              width: 40,
              color: AppColors.primaryDark,
            ),
        ],
      ),
    );
  }

  Widget _buildHeroSection() {
    return Container(
      height: 600,
      decoration: BoxDecoration(
        color: Colors.grey[300],
        image: const DecorationImage(
          image: AssetImage('assets/images/hero_waterfall.jpg'),
          fit: BoxFit.cover,
          // Fallback jika gambar tidak ada
          onError: null,
        ),
      ),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.black.withOpacity(0.4),
              Colors.black.withOpacity(0.6),
            ],
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 80),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Selamat Datang di',
                style: TextStyle(
                  fontSize: 24,
                  color: AppColors.textGold,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Waykanan',
                style: TextStyle(
                  fontSize: 72,
                  color: AppColors.white,
                  fontWeight: FontWeight.bold,
                  height: 1.1,
                ),
              ),
              const Text(
                'EXPLORE',
                style: TextStyle(
                  fontSize: 72,
                  color: AppColors.orange,
                  fontWeight: FontWeight.bold,
                  fontStyle: FontStyle.italic,
                  height: 1.1,
                ),
              ),
              const SizedBox(height: 24),
              const SizedBox(
                width: 500,
                child: Text(
                  'Jelajahi keindahan alam, budaya, dan potensi wisata tersembunyi di Kabupaten Way Kanan.',
                  style: TextStyle(
                    fontSize: 18,
                    color: AppColors.white,
                    height: 1.5,
                  ),
                ),
              ),
              const SizedBox(height: 40),
              Row(
                children: [
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primaryDark,
                      foregroundColor: AppColors.white,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 20,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: Row(
                      children: const [
                        Text(
                          'Jelajahi Sekarang',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(width: 8),
                        Icon(Icons.arrow_forward, size: 18),
                      ],
                    ),
                  ),
                  const SizedBox(width: 20),
                  OutlinedButton(
                    onPressed: () {},
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.white,
                      side: const BorderSide(color: AppColors.white, width: 2),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 20,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: Row(
                      children: const [
                        Icon(Icons.play_circle_outline, size: 24),
                        SizedBox(width: 8),
                        Text(
                          'Tonton Video',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFeaturesSection() {
    return Transform.translate(
      offset: const Offset(0, -60),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 80),
        child: Row(
          children: [
            Expanded(
              child: FeatureCard(
                icon: Icons.landscape,
                title: 'Alam Menakjubkan',
                description: 'Air terjun, sungai, dan pegunungan yang memukau',
                iconColor: AppColors.primaryDark,
              ),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: FeatureCard(
                icon: Icons.camera_alt,
                title: 'Destinasi Eksotis',
                description: 'Tempat wisata hidden gem yang wajib dikunjungi',
                iconColor: AppColors.orange,
              ),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: FeatureCard(
                icon: Icons.people,
                title: 'Budaya Lestari',
                description: 'Tradisi dan budaya lokal yang masih terjaga',
                iconColor: const Color(0xFF6B4226),
              ),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: FeatureCard(
                icon: Icons.map,
                title: 'Petualangan Seru',
                description: 'Ragam aktivitas outdoor untuk pengalaman tak terlupakan',
                iconColor: const Color(0xFFE63946),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPopularDestinationsSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 80),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'DESTINASI POPULER',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: AppColors.orange,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            'Jelajahi Keindahan Way Kanan',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: AppColors.textBlack,
              height: 1.2,
            ),
          ),
          const SizedBox(height: 40),
          SizedBox(
            height: 280,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                DestinationCard(
                  imageUrl: AppAssets.destination1,
                  title: 'Air Terjun Tirta Haji',
                  location: 'Banjit, Way Kanan',
                  onTap: () {},
                ),
                DestinationCard(
                  imageUrl: AppAssets.destination2,
                  title: 'Sungai Way Besai',
                  location: 'Negeri Besar, Way Kanan',
                  onTap: () {},
                ),
                DestinationCard(
                  imageUrl: AppAssets.destination3,
                  title: 'Bukit Barisan Selatan',
                  location: 'Way Kanan',
                  onTap: () {},
                ),
                DestinationCard(
                  imageUrl: AppAssets.destination4,
                  title: 'Goa Kelelawar',
                  location: 'Banjit, Way Kanan',
                  onTap: () {},
                ),
              ],
            ),
          ),
          const SizedBox(height: 40),
          Center(
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryDark,
                foregroundColor: AppColors.white,
                padding: const EdgeInsets.symmetric(
                  horizontal: 40,
                  vertical: 18,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Text(
                    'Lihat Semua Destinasi',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(width: 8),
                  Icon(Icons.arrow_forward, size: 18),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}