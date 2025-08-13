import { Movie, SavedMedia, SearchedMedia, TvSeries } from '@/interfaces';
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const SAVED_MEDIA_COLLECTION_ID = process.env.EXPO_PUBLIC_SAVED_MEDIA_COLLECTION_ID!;

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

export const saveMediaToWatchlist = async (media: SavedMedia) => {

  try {
    await databases.createDocument(
      DATABASE_ID,
      SAVED_MEDIA_COLLECTION_ID,
      ID.unique(),{
        id: media.id,
        title: media.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${media.posterUrl}`,
        overview: media.overview,
        media_type: media.media_type,
        vote_average: media.vote_average     
      }
    )
  } catch (error) {
    throw new Error(`Failed to save movie to watchlist. ${error}`)
  }
}

export const deleSavedMedia = async (id: string) => {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      SAVED_MEDIA_COLLECTION_ID,
      id)
  } catch (error) {
    throw new Error(`Failed to fetch movie details ${error}`)
  }
}

export const getSavedMedia = async ({pageParam = 0, limit = 10}: {pageParam?: number, limit?: number}): Promise<SavedMedia[]> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, SAVED_MEDIA_COLLECTION_ID, [
      Query.limit(limit),
      Query.offset((pageParam -1) * limit)
    ])
    return result.documents as unknown as SavedMedia[]
  } catch (error) {
    console.error('Error fetching saved media:', error);
    return [];
  }
}