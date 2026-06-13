import 'package:flutter/material.dart';
import 'package:user/core/constants/app_assets.dart';
import 'package:user/core/constants/app_colors.dart';
import 'package:user/features/home/widgets/feature_card.dart';
import 'package:user/features/home/widgets/destination_card.dart';
import 'package:user/features/destination/models/destination_model.dart';
import 'package:user/features/destination/services/destination_service.dart';

// Import halaman tujuan berdasarkan struktur folder Anda
import 'package:user/features/about/screens/about_way_kanan_page.dart';
import 'package:user/features/article/screens/article_page.dart';
import 'package:user/features/contact/screens/contact_page.dart';
import 'package:user/features/gallery/screens/gallery_page.dart';
import 'package:user/features/destination/screens/destination_list_page.dart';

class HomeDesktop extends StatelessWidget {
  HomeDesktop({super.key});

  final DestinationService _destinationService = DestinationService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.white,
      body: SingleChildScrollView(
        physics: const ClampingScrollPhysics(),
        child: Column(
          children: [
            // Navbar
            _buildNavbar(context),

            // Hero dan Feature Cards (Menggunakan Stack agar tidak error klik)
            Stack(
              clipBehavior: Clip.none,
              children: [
                _buildHeroSection(context),
                Positioned(
                  bottom: -60, 
                  left: 0,
                  right: 0,
                  child: _buildFeaturesSection(),
                ),
              ],
            ),

            const SizedBox(height: 100),

            // Popular Destinations Section
            _buildPopularDestinationsSection(context),

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
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              );
            },
          ),
          const Spacer(),

          // Menu Items dengan Navigator.push (Tanpa const pada page yang tidak mendukung)
          _buildNavItem('Beranda', isActive: true, onTap: () {}),
          _buildNavItem('Destinasi', onTap: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => DestinationListPage()));
          }),
          _buildNavItem('Tentang Way Kanan', onTap: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => const AboutWayKananPage()));
          }),
          _buildNavItem('Artikel', onTap: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => ArticlePage()));
          }),
          _buildNavItem('Galeri', onTap: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => GalleryPage()));
          }),
          _buildNavItem('Kontak', onTap: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => const ContactPage()));
          }),

          const SizedBox(width: 20),

          // CTA Button
          ElevatedButton(
            onPressed: () {
               // Arahkan ke halaman Destinasi juga sebagai aksi default CTA
               Navigator.push(context, MaterialPageRoute(builder: (context) => DestinationListPage()));
            },
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
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
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

  Widget _buildNavItem(String title, {bool isActive = false, VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
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
      ),
    );
  }

  Widget _buildHeroSection(BuildContext context) {
    return Container(
      height: 600,
      decoration: BoxDecoration(
        color: Colors.grey[300],
        image: const DecorationImage(
          image: AssetImage('assets/images/hero_waterfall.jpg'),
          fit: BoxFit.cover,
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
                    onPressed: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) => DestinationListPage()));
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primaryDark,
                      foregroundColor: AppColors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: Row(
                      children: const [
                        Text('Jelajahi Sekarang', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
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
                      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: Row(
                      children: const [
                        Icon(Icons.play_circle_outline, size: 24),
                        SizedBox(width: 8),
                        Text('Tonton Video', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
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
    return Padding(
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
    );
  }

  Widget _buildPopularDestinationsSection(BuildContext context) {
    return FutureBuilder<List<Destination>>(
      future: _destinationService.getDestinations(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final destinations = snapshot.data!;

        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 80),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'DESTINASI POPULER',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textBlack,
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                height: 280,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  itemCount: destinations.length,
                  itemBuilder: (context, index) {
                    return SizedBox(
                      width: 260, 
                      child: Padding(
                        padding: const EdgeInsets.only(right: 24),
                        child: DestinationCard(
                          destination: destinations[index],
                          onTap: () {
                             // Arahkan ke Detail Destinasi saat diklik (bisa disesuaikan dengan navigasi yang ada di aplikasi Anda)
                          },
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}