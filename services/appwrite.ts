import { Movie, TrendingMovies } from '@/interfaces';
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

  const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {

  try{

    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal('searchTerm', query),
  ])
  if(result.documents.length > 0) {
    
    const existingMovie = result.documents[0];

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      existingMovie.$id,
      {
        count: existingMovie.count + 1,
      }
    )
  } else {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,}
    )
  }

  } catch(error) {
    console.error('Error updating search count:', error);
    throw new Error('Failed to update search count');
  }
}

export const getSearchedMovies = async (): Promise<TrendingMovies[] | undefined> => {
  try{
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(10),
      Query.orderDesc('count'),
    ]);

    return result.documents as unknown as TrendingMovies[];

  } catch(error) {
    console.log(error)
    return undefined 
   }
}