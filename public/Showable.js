class Showable {
    async appendTo(parent){
        $(parent).append(await this.render())
        return;
    }

    async prependTo(parent){
        $(parent).prepend(await this.render())
        return;
    }

    show(){
        $('#' + this.id).removeClass('d-none');
    }

    hide(){
        $('#' + this.id).addClass('d-none');
    }
}