import { Movie, ReviewData, SavedMedia, SearchedMedia, TvSeries } from '@/interfaces';
import { Client, Databases, ID, Query } from 'react-native-appwrite';
import config from "../app.json";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID! ?? config.expo.extra.appwrite.dbId;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID! ?? config.expo.extra.appwrite.collectionId;

const SAVED_MEDIA_COLLECTION_ID = process.env.EXPO_PUBLIC_SAVED_MEDIA_COLLECTION_ID! ?? config.expo.extra.appwrite.savedCollectionId;

const REVIEW_MEDIA_COLLECTION_ID = process.env.EXPO_PUBLIC_REVIEW_COLLECTION_ID! ?? config.expo.extra.appwrite.reviewCollectionId;

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID! ?? config.expo.extra.appwrite.projectId

// It physically hurts me doing it this way. Rest assured I know better than to pass sensitive keys like this. I working on a lightweight backend,
// so I can get rid of this atrocity!!!

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export const checkSearchData = async (
  query: string,
  media: Movie | TvSeries,
  media_type: string,
) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query),
      Query.equal('media_type', media_type),
      Query.equal('id', media.id),
    ]);
    if (result.documents.length > 0) {
      return { status: 'Entry already exists' };
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        id: media.id,
        title: media_type === 'movie' ? (media as Movie).title : (media as TvSeries).name,
        posterUrl: `https://image.tmdb.org/t/p/w500${media.poster_path}`,
        overview: media.overview,
        media_type: media_type,
        vote_average: media.vote_average,
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
    throw new Error('Failed to update search count');
  }
};

export const getSearchedMovies = async (): Promise<SearchedMedia[] | undefined> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5)]);
    return result.documents as unknown as SearchedMedia[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveMediaToWatchlist = async (media: SavedMedia) => {
  try {
    const doc = await databases.createDocument(
      DATABASE_ID,
      SAVED_MEDIA_COLLECTION_ID,
      media.id.toString(),
      {
        id: media.id,
        title: media.title,
        overview: media.overview,
        media_type: media.media_type,
        vote_average: media.vote_average,
        genres: media.genres,
        posterUrl: media.posterUrl,
      },
    );
    return doc;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to save movie to watchlist. ${error}`);
  }
};

export const deleteSavedMedia = async (id: string) => {
  try {
    await databases.deleteDocument(DATABASE_ID, SAVED_MEDIA_COLLECTION_ID, id);
    return id;
  } catch (error) {
    throw new Error(`Failed to delete movie details ${error}`);
  }
};

export const saveMediaExists = async (id: number): Promise<boolean> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, SAVED_MEDIA_COLLECTION_ID, [
      Query.equal('id', id),
    ]);
    if (result.documents.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking saved media:', error);
    return false;
  }
};

export const getSavedMedia = async ({
  pageParam = 1,
  limit = 10,
}: {
  pageParam?: number;
  limit?: number;
}) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, SAVED_MEDIA_COLLECTION_ID, [
      Query.limit(limit),
      Query.offset((pageParam - 1) * limit),
    ]);
    return {
      data: result.documents as unknown as SavedMedia[],
      total: result.total,
    };
  } catch (error) {
    console.error('Error fetching saved media:', error);
    return {
      data: [],
      total: 0,
    };
  }
};

export const postReview = async (formData: ReviewData) => {
  try {
    const doc = await databases.createDocument(
      DATABASE_ID,
      REVIEW_MEDIA_COLLECTION_ID,
      ID.unique(),
      {
        name: formData.name,
        company: formData.company,
        designation: formData.designation,
        email: formData.email,
        linkedin: formData.linkedin,
        comments: formData.comments,
      },
    );
    return doc;
  } catch (error) {
    console.log(error);
    throw new Error('Oops! Something went wrong!');
  }
};
