class Destination {
  final String id;
  final String name;
  final String imageUrl;
  final Location location;
  final double rating;
  final int reviewsCount;
  final String operationalHours;
  final String website;
  final String phone;
  final String description;
  final OurTake ourTake;
  final List<Category> categories;
  final List<Gallery> galleries;

  Destination({
    required this.id,
    required this.name,
    required this.imageUrl,
    required this.location,
    required this.rating,
    required this.reviewsCount,
    required this.operationalHours,
    required this.website,
    required this.phone,
    required this.description,
    required this.ourTake,
    required this.categories,
    required this.galleries,
  });

  factory Destination.fromJson(Map<String, dynamic> json) {
    return Destination(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      imageUrl: json['imageUrl'] ?? '',
      location: Location.fromJson(json['location'] ?? {}),
      rating: (json['rating'] ?? 0).toDouble(),
      reviewsCount: json['reviewsCount'] ?? 0,
      operationalHours: json['operationalHours'] ?? '',
      website: json['website'] ?? '',
      phone: json['phone'] ?? '',
      description: json['description'] ?? '',
      ourTake: OurTake.fromJson(json['ourTake'] ?? {}),
      categories: (json['categories'] as List<dynamic>?)
              ?.map((e) => Category.fromJson(e))
              .toList() ??
          [],
      galleries: (json['galleries'] as List<dynamic>?)
              ?.map((e) => Gallery.fromJson(e))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'imageUrl': imageUrl,
      'location': location.toJson(),
      'rating': rating,
      'reviewsCount': reviewsCount,
      'operationalHours': operationalHours,
      'website': website,
      'phone': phone,
      'description': description,
      'ourTake': ourTake.toJson(),
      'categories': categories.map((e) => e.toJson()).toList(),
      'galleries': galleries.map((e) => e.toJson()).toList(),
    };
  }
}

class Location {
  final String address;
  final double latitude;
  final double longitude;

  Location({
    required this.address,
    required this.latitude,
    required this.longitude,
  });

  factory Location.fromJson(Map<String, dynamic> json) {
    return Location(
      address: json['address'] ?? '',
      latitude: (json['latitude'] ?? 0).toDouble(),
      longitude: (json['longitude'] ?? 0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
    };
  }
}

class OurTake {
  final String author;
  final String authorAvatar;
  final String content;

  OurTake({
    required this.author,
    required this.authorAvatar,
    required this.content,
  });

  factory OurTake.fromJson(Map<String, dynamic> json) {
    return OurTake(
      author: json['author'] ?? '',
      authorAvatar: json['authorAvatar'] ?? '',
      content: json['content'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'author': author,
      'authorAvatar': authorAvatar,
      'content': content,
    };
  }
}

class Category {
  final String id;
  final String name;
  final String icon;

  Category({
    required this.id,
    required this.name,
    required this.icon,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      icon: json['icon'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'icon': icon,
    };
  }
}

class Gallery {
  final String id;
  final String imageUrl;
  final bool isPrimary;

  Gallery({
    required this.id,
    required this.imageUrl,
    required this.isPrimary,
  });

  factory Gallery.fromJson(Map<String, dynamic> json) {
    return Gallery(
      id: json['id'] ?? '',
      imageUrl: json['imageUrl'] ?? '',
      isPrimary: json['isPrimary'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'imageUrl': imageUrl,
      'isPrimary': isPrimary,
    };
  }
}