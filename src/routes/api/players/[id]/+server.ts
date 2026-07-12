import { error, json } from "@sveltejs/kit";
import type {RequestHandler} from './$types'

import{
    updatePlayer,
    deletePlayer
} from '$lib/server/player.service'


export const PUT: RequestHandler = async({params, request})=>{
    try {

        const  id = Number(params.id);
        
        if(isNaN(id)){
            return json({error: 'Invalid player Id'},{status:400});
        }

        const {name, email, country} = await request.json();

        if(!name?.trim()){
            return json({error:'Name is required'}, {status:400})
        }     
        if(!email?.trim()){
            return json({error:'Email is required'}, {status:400})
        }     
        
        const player = await updatePlayer(
            id,
            name.trim(),
            email.trim(),
            country?.trim() || null
        );

        if(!player){
            return json({error:'Player not Found'},{status:404});
        }

        return json(player);
        
    } catch (error) {
        console.error(error)
        return json(
            {error:'Internal Server Error'},
            {status: 500}
        );

    }
}

export const DELETE: RequestHandler = async({params})=>{
    try {

        const id = Number(params.id);
         if(isNaN(id)){
            return json({error:'Invalid palyer id '},{status:400})

         }

         const player = await deletePlayer(id);

         if(!player){
            return json({error:'Player not Found'},{status:404})
         }

         return json({message: 'Player deleted successfully'})
        
    } catch (error) {
        console.error(error)

        return json(
            {error:'Internal server error'},
            {status: 500}
        )
        
    }
}