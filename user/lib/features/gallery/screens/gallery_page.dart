import 'package:flutter/material.dart';

// --- Model Dummy untuk Galeri ---
class GalleryItem {
  final String title;
  final String imageUrl;

  GalleryItem({
    required this.title,
    required this.imageUrl,
  });
}

class GalleryPage extends StatelessWidget {
  GalleryPage({Key? key}) : super(key: key);

  // --- 12 Data Dummy Galeri ---
  final List<GalleryItem> _galleryItems = [
    GalleryItem(title: 'Air Terjun Putri Malu', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Curup Gangsa', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Goa Kelelawar', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Way Besai', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Gedung Batin', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Curup Jepun', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Bukit Punggur', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Air Terjun Tirta Haji', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Bendungan Way Umpu', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Curup Kereta', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Lembah Hijau Way Kanan', imageUrl: 'assets/images/default_destination.jpg'),
    GalleryItem(title: 'Danau Lebar', imageUrl: 'assets/images/default_destination.jpg'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text(
          'Galeri',
          style: TextStyle(fontWeight: FontWeight.w600, color: Colors.black87),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        iconTheme: const IconThemeData(color: Colors.black87),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          // --- Logika Responsif ---
          // Jika lebar layar lebih dari 800px (Web/Desktop), gunakan 4 kolom.
          // Jika kurang dari itu (Mobile/Tablet kecil), gunakan 2 kolom.
          int crossAxisCount = constraints.maxWidth > 800 ? 4 : 2;

          return GridView.builder(
            padding: const EdgeInsets.all(16.0),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: crossAxisCount,
              crossAxisSpacing: 16.0,
              mainAxisSpacing: 16.0,
              childAspectRatio: 0.85, // Menyesuaikan rasio tinggi dan lebar card
            ),
            itemCount: _galleryItems.length,
            itemBuilder: (context, index) {
              return _buildGalleryCard(context, _galleryItems[index]);
            },
          );
        },
      ),
    );
  }

  // --- Helper Widget: Gallery Card ---
  Widget _buildGalleryCard(BuildContext context, GalleryItem item) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
        border: Border.all(color: Colors.grey.shade100),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Bagian Gambar
          Expanded(
            child: ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(16),
                topRight: Radius.circular(16),
              ),
              child: Image.asset(
                item.imageUrl,
                fit: BoxFit.cover,
                // Error builder jika aset belum dimasukkan untuk menghindari crash/layar merah
                errorBuilder: (context, error, stackTrace) => Container(
                  color: Colors.grey.shade300,
                  child: const Center(
                    child: Icon(Icons.image_not_supported, color: Colors.grey, size: 32),
                  ),
                ),
              ),
            ),
          ),
          // Bagian Teks (Nama Destinasi)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 14.0),
            child: Text(
              item.title,
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
                height: 1.2,
              ),
            ),
          ),
        ],
      ),
    );
  }
}