import { JSX } from 'react'
import { ForbiddenWord } from '@prisma/client';
import { deleteForbiddenWordAction } from '@/actions/adminActions';
import { Card, CardContent } from '../ui/card';
import { FaTrashAlt } from "react-icons/fa";

function ForbiddenWordCard({ word }: { word: ForbiddenWord }): JSX.Element {
    const deleteForbiddenWord = deleteForbiddenWordAction.bind(null, word.id);

    return (
        <Card className='py-5 border border-[#E5C6AC] hover:shadow-md transition'>
            <CardContent className='flex items-center justify-between'>
                {word.word}

                <form action={deleteForbiddenWord}>
                    <button type='submit' className='text-red-500 hover:text-red-700 transition cursor-pointer'>
                        <FaTrashAlt size={18} />
                    </button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ForbiddenWordCard