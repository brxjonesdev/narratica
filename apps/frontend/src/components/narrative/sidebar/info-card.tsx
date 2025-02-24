import * as React from 'react';
import {
  Card
} from '@/components/ui/card';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

export default function InfoCard() {
  return (
    <Card className="flex items-center p-3 gap-3">
        <section className="">
            <TooltipProvider delayDuration={20}>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src="https://qph.cf2.quoracdn.net/main-qimg-02884099e1268d08ab734daae5a773c2-pjlq"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="hover:scale-110 transition-transform duration-300 cursor-pointer"
                    style={{
                      width: '100%',
                      height: 'auto',
                      minWidth: '50px',
                      maxHeight: '75px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '0.5rem',
                    }}
                    priority
                    unoptimized
                    quality={100}
                    placeholder="blur"
                    blurDataURL="/images/logo.png"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                  />
                </TooltipTrigger>
                <TooltipContent className='font-figtree mt-2'>
                  <p>Edit Metadata</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </section>
        <section className='w-full'>
            <div>
        <p>Narrative Name</p>
        <p className="text-xs text-muted-foreground">Narrative Subtitle</p>
        </div>
        <Separator className='my-2'/>
        <div>
            <p className='text-xs'>
                Last Updated: <span className='text-xs text-muted-foreground'>
                    {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </p>
        </div>
        </section>
</Card> 
  )
}
