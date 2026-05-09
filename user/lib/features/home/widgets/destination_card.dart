import 'package:flutter/material.dart';
import 'package:user/core/constants/app_colors.dart';

class DestinationCard extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String location;
  final VoidCallback? onTap;

  const DestinationCard({
    Key? key,
    required this.imageUrl,
    required this.title,
    required this.location,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 250,
        margin: const EdgeInsets.only(right: 16),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
              child: Container(
                height: 160,
                decoration: BoxDecoration(
                  color: AppColors.greyLight,
                ),
                child: Stack(
                  children: [
                    // Placeholder untuk gambar
                    Center(
                      child: Icon(
                        Icons.image,
                        size: 50,
                        color: AppColors.textGrey.withOpacity(0.3),
                      ),
                    ),
                    // Jika ingin pakai network image atau asset
                    // Image.asset(
                    //   imageUrl,
                    //   width: double.infinity,
                    //   height: 160,
                    //   fit: BoxFit.cover,
                    // ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textBlack,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(
                        Icons.location_on,
                        size: 14,
                        color: AppColors.primaryDark,
                      ),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          location,
                          style: TextStyle(
                            fontSize: 13,
                            color: AppColors.textGrey,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}