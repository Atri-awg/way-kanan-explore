import 'package:flutter/material.dart';

// --- Model Dummy untuk Artikel ---
class Article {
  final String title;
  final String category;
  final String date;
  final String imageUrl;
  final String summary;

  Article({
    required this.title,
    required this.category,
    required this.date,
    required this.imageUrl,
    required this.summary,
  });
}

class ArticlePage extends StatelessWidget {
  ArticlePage({Key? key}) : super(key: key);

  // --- Data Dummy Artikel ---
  final List<Article> _articles = [
    Article(
      title: 'Menjelajahi Air Terjun Putri Malu',
      category: 'Alam',
      date: '12 Okt 2023',
      imageUrl: 'assets/images/default_destination.jpg',
      summary: 'Temukan pesona air terjun setinggi 80 meter yang melengkung indah bak punggung manusia di tengah hutan tropis.',
    ),
    Article(
      title: 'Pesona Curup Gangsa',
      category: 'Alam',
      date: '05 Okt 2023',
      imageUrl: 'assets/images/default_destination.jpg',
      summary: 'Nikmati gemuruh air terjun memukau yang suaranya konon menyerupai alunan seruling bambu dari kejauhan.',
    ),
    Article(
      title: 'Wisata Budaya Gedung Batin',
      category: 'Budaya',
      date: '28 Sep 2023',
      imageUrl: 'assets/images/default_destination.jpg',
      summary: 'Rasakan pengalaman otentik menginap di desa tradisional yang masih mempertahankan arsitektur rumah panggung kayu.',
    ),
    Article(
      title: 'Tips Liburan ke Way Kanan',
      category: 'Panduan',
      date: '15 Sep 2023',
      imageUrl: 'assets/images/default_destination.jpg',
      summary: 'Panduan lengkap persiapan transportasi, akomodasi, dan fisik sebelum memulai petualangan Anda.',
    ),
    Article(
      title: 'Arung Jeram Sungai Way Besai',
      category: 'Petualangan',
      date: '02 Sep 2023',
      imageUrl: 'assets/images/default_destination.jpg',
      summary: 'Uji adrenalin Anda dengan menyusuri jeram-jeram menantang di sungai kebanggaan warga Way Kanan.',
    ),
    Article(
      title: 'Destinasi Alam Terbaik Way Kanan',
      category: 'Rekomendasi',
      date: '20 Ags 2023',
      imageUrl: 'assets/images/default_destination.jpg',
      summary: 'Daftar destinasi wisata alam wajib kunjung untuk Anda yang mencari ketenangan dan kesegaran alam di akhir pekan.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text(
          'Artikel',
          style: TextStyle(fontWeight: FontWeight.w600, color: Colors.black87),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        iconTheme: const IconThemeData(color: Colors.black87),
      ),
      body: Center(
        // ConstrainedBox untuk membatasi lebar maksimal di tampilan Web/Desktop
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Column(
            children: [
              // --- Search Bar (UI Saja) ---
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: TextField(
                  decoration: InputDecoration(
                    hintText: 'Cari artikel wisata...',
                    hintStyle: TextStyle(color: Colors.grey.shade400),
                    prefixIcon: const Icon(Icons.search, color: Colors.grey),
                    filled: true,
                    fillColor: Colors.white,
                    contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                      borderSide: BorderSide(color: Colors.grey.shade200),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                      borderSide: BorderSide(color: Colors.grey.shade200),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                      borderSide: const BorderSide(color: Colors.blueAccent),
                    ),
                  ),
                ),
              ),

              // --- Daftar Artikel menggunakan ListView.builder ---
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  itemCount: _articles.length,
                  itemBuilder: (context, index) {
                    final article = _articles[index];
                    return _buildArticleCard(context, article);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // --- Helper Widget: Article Card ---
  Widget _buildArticleCard(BuildContext context, Article article) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
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
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Thumbnail Kiri
          ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(16),
              bottomLeft: Radius.circular(16),
            ),
            child: Image.asset(
              article.imageUrl,
              width: 120,
              height: 120,
              fit: BoxFit.cover,
              // Error builder untuk menangani jika gambar placeholder belum dimasukkan ke folder assets
              errorBuilder: (context, error, stackTrace) => Container(
                width: 120,
                height: 120,
                color: Colors.grey.shade300,
                child: const Icon(Icons.image_not_supported, color: Colors.grey, size: 32),
              ),
            ),
          ),
          
          // Konten Kanan (Judul, Kategori, Tanggal, Ringkasan)
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        article.category.toUpperCase(),
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: Colors.blueAccent,
                          letterSpacing: 0.5,
                        ),
                      ),
                      Text(
                        article.date,
                        style: TextStyle(
                          fontSize: 10,
                          color: Colors.grey.shade500,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    article.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                      height: 1.2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    article.summary,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.black54,
                      height: 1.4,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}