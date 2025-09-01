import { JSX } from 'react'
import { ForbiddenWord } from '@prisma/client';
import { deleteForbiddenWordAction } from '@/actions/forbiddenWordAction';
import WithConfirmOption from '@/components/WithConfirmOption';
import { Card, CardContent } from '../../ui/card';
import { FaTrashAlt } from "react-icons/fa";

function ForbiddenWordCard({ word }: { word: ForbiddenWord }): JSX.Element {
    const deleteForbiddenWord = deleteForbiddenWordAction.bind(null, word.id);

    return (
        <Card className='rounded-2xl border border-[#E5C6AC] bg-white py-5 shadow-sm hover:shadow-lg hover:border-[#C05C41] transition-all duration-200'>
            <CardContent className='flex items-center justify-between'>
                {word.word}

                <WithConfirmOption
                    action={deleteForbiddenWord}
                    buttonCss='text-red-500 hover:text-red-700 transition cursor-pointer'
                >
                    <FaTrashAlt size={18} />
                </WithConfirmOption>
            </CardContent>
        </Card>
    )
}

export default ForbiddenWordCard