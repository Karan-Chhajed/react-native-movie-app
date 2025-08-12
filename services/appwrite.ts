import { Movie, SearchedMedia, TvSeries } from '@/interfaces';
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export const checkSearchData = async (query: string, media: Movie | TvSeries, media_type: string) => {

  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query),
      Query.equal('media_type', media_type),
      Query.equal('id', media.id),
    ])
    if (result.documents.length > 0) {
      return {status: 'Entry already exists'}
    } else {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          id: media.id,
          title: media_type === 'Movie' ? (media as Movie).title : (media as TvSeries).name,
          posterUrl: `https://image.tmdb.org/t/p/w500${media.poster_path}`,
          overview: media.overview,
          media_type: media_type,
          vote_average: media.vote_average
        }
      );

    }

  } catch (error) {
    console.error('Error updating search count:', error);
    throw new Error('Failed to update search count');
  }
}

export const getSearchedMovies = async (): Promise<SearchedMedia[] | undefined> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5)
    ])
    return result.documents as unknown as SearchedMedia[];

  } catch (error) {
    console.log(error)
    return undefined
  }
}