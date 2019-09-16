<template>
    <div>
        <div class="flex-container wrap">
            <div class="border paddingh10 radius margin10" v-for="name in data">
                <i class="baseIcon fs-20"  :class="[`baseIcon-${name}`]"></i>
            </div>

        </div>

    </div>
</template>

<script>
    let data=[
        'check',
        'close',
        'roundcheckfill',
        'roundcheck',
        'roundclosefill',
        'roundclose',
        'roundrightfill',
        'roundright',
        'search',
        'timefill',
        'time',
        'unfold',
        'back',
        'more',
        'scan',
        'settings',
        'questionfill',
        'question',
        'pulldown',
        'pullup',
        'right',
        'refresh',
        'moreandroid',
        'deletefill',
        'cart',
        'delete',
            'home',
        'cartfill',
        'homefill',
        'message',
        'squarecheckfill',
        'square',
        'squarecheck',
        'round',
        'roundaddfill',
        'roundadd',
        'add',
        'fold',
        'infofill',
        'info',
        'voice',
        'voicefill',
        'wifi',
        'share',
        'barcode',
        'sort',
        'pullleft',
        'pullright',
        'peoplefill',
        'people',
        'attentionfill',
        'attention',
        'attentionforbid',
        'attentionforbidfill',
        'radiobox',
        'radioboxfill',
        'messagefill',
        'round_sub_fill',
        'square_sub_fill',
        'square_sub',
        'round_sub',
    ];
    import '../../../../src/cyan/CMUI_doc.scss';
    export default {
        name: "Import",
        data(){
            return{
                data
            }
        }

    }
</script>
