import {connectToDB} from '@/utils/database';
import Data from '@/models/datatable';

export default async function handler(req,res){
    // if(req.method !== POST){
    //     return res.status(405).json({ message: 'Method not allowed' });
    // }



    try{
        const{time1hour, time1minute} = await req.json()

        const time1hourNumber = parseInt(time1hour, 10); // Use base 10 for parsing
        const time1minuteNumber = parseInt(time1minute, 10);

        console.log(time1hourNumber)
        console.log(time1minuteNumber)


        await connectToDB();

        const data = new Data({
            time1hour: time1hourNumber,
            time1minute: time1minuteNumber,
        });

        await data.save()

        console.log('data inserted')
        return new Response(JSON.stringify(data), {status: 201})
    }catch (error) {
        console.log(error.message)
        return new Response("Failed to create a new prompt",{status: 500})
        // res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

export const POST = handler