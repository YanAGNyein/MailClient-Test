import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { NoCommaPipe } from './no-comma.pipe';
import { SpaceFormattingToPlaintextPipe } from './spaceFormattingToPlaintext';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        NoCommaPipe,
        SpaceFormattingToPlaintextPipe,
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        NoCommaPipe,
        SpaceFormattingToPlaintextPipe,
    ]
})
export class FusePipesModule
{
}
