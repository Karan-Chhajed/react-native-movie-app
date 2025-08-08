import { Link } from "expo-router";
import React, { FC } from "react";
import HorizontalMediaCard from './HorizontalMediaCard'
import { TouchableOpacity } from "react-native";

interface HorizontalMediaCardProps {
    name: string;
    vote_average?: number;
    overview?: string;
    type?: string;
    poster_path: string;
    id: string | number;
}

const HorizontalMediaCardWithLink: FC<HorizontalMediaCardProps> = ({name, vote_average, overview, type, poster_path, id}) => {
    if(type === 'MOVIE') {
        return(
            <Link href={`/movies/${id}`} className="py-4" asChild>
                <TouchableOpacity className="">
                    <HorizontalMediaCard name={name} poster_path={poster_path} vote_average={vote_average} type={type} overview={overview} />
                </TouchableOpacity>
            </Link>
        ) }
        return(
            <Link href={`/tv/${id}`} asChild className="py-4">
                <TouchableOpacity className="">
                <HorizontalMediaCard name={name} poster_path={poster_path} vote_average={vote_average} type={type} overview={overview} />
                </TouchableOpacity>
            </Link>
        )
    }
     

export default HorizontalMediaCardWithLink

 