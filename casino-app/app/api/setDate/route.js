import {connectToDB} from '@/utils/database';
import Data from '@/models/datatable';

export default async function handler(req,res){
    // if(req.method !== POST){
    //     return res.status(405).json({ message: 'Method not allowed' });
    // }

    try{
        
        let { date } = await req.json();
        console.log("Received date in API: ", date);

        await connectToDB();

        // Create a new instance of the Data model with the received date
        const data = new Data({
            date: new Date(date), // Convert the received date string to a Date object
            // other fields if any
        });

        // Save the new data instance to the database
        await data.save();

        console.log('Date inserted');


        return new Response(JSON.stringify('sucess'), {status: 201})
    }catch (error) {
        console.log(error.message)
        return new Response("Failed to create a new prompt",{status: 500})
        // res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

export const POST = handler