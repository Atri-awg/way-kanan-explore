export class CreateDestinasiDto {
  name: string;

  slug: string;

  description: string;

  location: string;

  categoryId: string;

  thumbnail?: string;

  status?: boolean;
}