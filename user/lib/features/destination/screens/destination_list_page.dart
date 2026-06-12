import 'package:flutter/material.dart';
import 'package:user/features/destination/models/destination_model.dart';
import 'package:user/features/destination/services/destination_service.dart';
import 'package:user/features/home/widgets/destination_card.dart';
import 'destination_detail_page.dart';

class DestinationListPage extends StatelessWidget {
  DestinationListPage({super.key});

  final DestinationService service = DestinationService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Destinations')),
      body: FutureBuilder<List<Destination>>(
        future: service.getDestinations(),
        builder: (context, snapshot) {
          print("STATE = ${snapshot.connectionState}");

          if (snapshot.hasData) {
            print("DATA = ${snapshot.data!.length}");
          }

          if (snapshot.hasError) {
            print("ERROR = ${snapshot.error}");
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text(snapshot.error.toString()));
          }
          

          final destinations = snapshot.data ?? [];
          print(destinations.first.name);
          print(destinations.first.toJson());

          return ListView.builder(
            itemCount: destinations.length,
            itemBuilder: (context, index) {
              final destination = destinations[index];

              return DestinationCard(
                destination: destination,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                          DestinationDetailPage(destination: destination),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}
