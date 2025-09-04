export class UpdateSuperheroDto {
  nickname?: string;
  real_name?: string;
  origin_description?: string;
  superpowers?: string[] | string;
  catch_phrase?: string;
  images?: { id: string; path: string }[];
  removeImages?: string[];
}
