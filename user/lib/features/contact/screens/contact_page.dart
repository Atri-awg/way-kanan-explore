import 'package:flutter/material.dart';

class ContactPage extends StatelessWidget {
  const ContactPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text(
          'Hubungi Kami',
          style: TextStyle(fontWeight: FontWeight.w600, color: Colors.black87),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        iconTheme: const IconThemeData(color: Colors.black87),
      ),
      body: Center(
        // ConstrainedBox digunakan agar tampilan di Web/Desktop tidak melebar berlebihan
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // --- 1. Header Tambahan (Opsional untuk estetika) ---
                const Text(
                  'Tetap Terhubung',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Kami senang mendengar dari Anda. Silakan hubungi kami melalui informasi di bawah ini atau kirimkan pesan secara langsung.',
                  style: TextStyle(
                    fontSize: 16,
                    height: 1.5,
                    color: Colors.black54,
                  ),
                ),
                const SizedBox(height: 32),

                // --- 2. Card Informasi Kontak ---
                Container(
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
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      _buildContactItem(
                        icon: Icons.location_on_outlined,
                        title: 'Alamat',
                        content: 'Way Kanan Explore\nKabupaten Way Kanan\nLampung',
                        iconColor: Colors.redAccent,
                      ),
                      const Divider(height: 32, color: Color(0xFFEEEEEE)),
                      _buildContactItem(
                        icon: Icons.email_outlined,
                        title: 'Email',
                        content: 'info@waykananexplore.com',
                        iconColor: Colors.blueAccent,
                      ),
                      const Divider(height: 32, color: Color(0xFFEEEEEE)),
                      _buildContactItem(
                        icon: Icons.phone_outlined,
                        title: 'Telepon',
                        content: '+62 811 2233 4455',
                        iconColor: Colors.green,
                      ),
                      const Divider(height: 32, color: Color(0xFFEEEEEE)),
                      _buildContactItem(
                        icon: Icons.language_outlined,
                        title: 'Website',
                        content: 'www.waykananexplore.com',
                        iconColor: Colors.orange,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 40),

                // --- 3. Section Media Sosial ---
                const Text(
                  'Media Sosial',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 16,
                  runSpacing: 16,
                  children: [
                    _buildSocialMediaButton(Icons.camera_alt_outlined, 'Instagram', Colors.purple),
                    _buildSocialMediaButton(Icons.facebook, 'Facebook', Colors.blue),
                    _buildSocialMediaButton(Icons.music_note, 'TikTok', Colors.black),
                    _buildSocialMediaButton(Icons.play_circle_fill, 'YouTube', Colors.red),
                  ],
                ),
                const SizedBox(height: 48),

                // --- 4. Tombol Kirim Pesan ---
                SizedBox(
                  width: double.infinity,
                  height: 54,
                  child: ElevatedButton(
                    onPressed: () {
                      // Fungsi tombol belum diimplementasikan (hanya UI)
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blueAccent,
                      foregroundColor: Colors.white,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      'Kirim Pesan',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // --- Helper Widget: Item Kontak ---
  Widget _buildContactItem({
    required IconData icon,
    required String title,
    required String content,
    required Color iconColor,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
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
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey.shade600,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                content,
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.black87,
                  fontWeight: FontWeight.w600,
                  height: 1.4,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // --- Helper Widget: Tombol Media Sosial ---
  Widget _buildSocialMediaButton(IconData icon, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(width: 8),
          Text(
            label,
            style: const TextStyle(
              fontWeight: FontWeight.w600,
              color: Colors.black87,
            ),
          ),
        ],
      ),
    );
  }
}