import { Link } from "expo-router";
import React, { FC } from "react";
import HorizontalMediaCard from './HorizontalMediaCard'
import { TouchableOpacity } from "react-native";

interface HorizontalMediaCardProps {
    name: string;
    overview?: string;
    type: string;
    poster_path: string;
    id: string | number;
}

const HorizontalMediaCardWithLink: FC<HorizontalMediaCardProps> = ({name, overview, type, poster_path, id}) => {
   
    if(type === 'movie') {
        return(
            <Link href={`/movies/${id}`} className="p-4 " asChild>
                <TouchableOpacity className="w-full">
                    <HorizontalMediaCard name={name} poster_path={poster_path}  type={type} overview={overview} />
                </TouchableOpacity>
            </Link>
        ) }
        else if(type === 'tv') {
        return(
            <Link href={`/tv/${id}`} asChild className="p-4">
                <TouchableOpacity className="w-full">
                <HorizontalMediaCard name={name} poster_path={poster_path} type={type} overview={overview} />
                </TouchableOpacity>
            </Link>
        )}
    }
     

export default HorizontalMediaCardWithLink

 