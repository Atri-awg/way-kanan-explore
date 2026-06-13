import 'package:flutter/material.dart';

class AboutWayKananPage extends StatelessWidget {
  const AboutWayKananPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text(
          'Informasi',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black87,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
      body: Center(
        // ConstrainedBox digunakan agar tampilan di Web/Desktop tidak terlalu melebar
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // --- 1. Hero Banner ---
                Container(
                  width: double.infinity,
                  height: 220,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade300,
                  ),
                  child: Image.asset(
                    'assets/images/default_destination.jpg',
                    fit: BoxFit.cover,
                    // Penanganan error jika aset gambar belum ada saat pengembangan
                    errorBuilder: (context, error, stackTrace) => const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.image_not_supported, size: 50, color: Colors.grey),
                          SizedBox(height: 8),
                          Text('Image Placeholder', style: TextStyle(color: Colors.grey)),
                        ],
                      ),
                    ),
                  ),
                ),

                // Padding utama untuk konten di bawah banner
                Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // --- 2. Judul ---
                      const Text(
                        'Tentang Way Kanan',
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 16),

                      // --- 3. Deskripsi Singkat ---
                      const Text(
                        'Way Kanan merupakan salah satu kabupaten di Provinsi Lampung yang memiliki potensi wisata alam, budaya, sejarah, dan petualangan yang sangat beragam.',
                        style: TextStyle(
                          fontSize: 16,
                          height: 1.6,
                          color: Colors.black54,
                        ),
                      ),
                      const SizedBox(height: 32),

                      // --- 4. Section: Mengapa Berkunjung ke Way Kanan? ---
                      const Text(
                        'Mengapa Berkunjung ke Way Kanan?',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 16),
                      _buildReasonItem(Icons.park_outlined, 'Wisata Alam', Colors.green),
                      _buildReasonItem(Icons.water_drop_outlined, 'Air Terjun', Colors.blue),
                      _buildReasonItem(Icons.kayaking_outlined, 'Sungai dan Arung Jeram', Colors.teal),
                      _buildReasonItem(Icons.museum_outlined, 'Budaya Lokal', Colors.orange),
                      _buildReasonItem(Icons.family_restroom_outlined, 'Wisata Keluarga', Colors.purple),
                      const SizedBox(height: 32),

                      // --- 5. Section: Statistik ---
                      const Text(
                        'Way Kanan dalam Angka',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 16),
                      // Menggunakan Wrap agar responsif menyesuaikan lebar layar
                      Wrap(
                        spacing: 16,
                        runSpacing: 16,
                        alignment: WrapAlignment.spaceBetween,
                        children: [
                          _buildStatCard('20+', 'Destinasi\nWisata', Icons.place_outlined),
                          _buildStatCard('10+', 'Air\nTerjun', Icons.waterfall_chart),
                          _buildStatCard('14', 'Total\nKecamatan', Icons.map_outlined),
                          _buildStatCard('400k+', 'Jumlah\nPenduduk', Icons.people_outline),
                        ],
                      ),
                      const SizedBox(height: 48),

                      // --- 6. Footer ---
                      const Center(
                        child: Column(
                          children: [
                            Text(
                              'Way Kanan Explore',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.blueGrey,
                                letterSpacing: 1.2,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              'Discover the Hidden Gems',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 24),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // --- Helper Widget: Reason Item ---
  Widget _buildReasonItem(IconData icon, String title, Color iconColor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: iconColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: iconColor, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: Colors.black87,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // --- Helper Widget: Stat Card ---
  Widget _buildStatCard(String value, String label, IconData icon) {
    return LayoutBuilder(
      builder: (context, constraints) {
        // Mengatur lebar dinamis untuk Wrap
        double cardWidth = 150; 
        return Container(
          width: cardWidth,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.04),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
            border: Border.all(color: Colors.grey.shade100),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(icon, color: Colors.blueAccent, size: 28),
              const SizedBox(height: 16),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                label,
                style: const TextStyle(
                  fontSize: 14,
                  color: Colors.grey,
                  height: 1.2,
                ),
              ),
            ],
          ),
        );
      }
    );
  }
}