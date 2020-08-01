/**
 * Showable:
 * 
 * Showable is an abstract class for objects that will be related to HTML elements.
 * All classes that extend Showable must implement a render method that returns the HTML of the object.
 */
class Showable {
    
    /**
     * Appends the Showable's HTML to an existing HTML object.
     * 
     * @param {Object} parent The HTML object to which this Showable will be appended.
     */
    async appendTo(parent){
        $(parent).append(await this.render());
        this.activate();
        return;
    }

    /**
     * Preppends the Showable's HTML to an existing HTML object.
     * @param {Object} parent The HTML object to which this Showable will be prepended.
     */
    async prependTo(parent){
        $(parent).prepend(await this.render());
        this.activate();
        return;
    }

    activate(){

    }

    /**
     * Shows this Showable's HTML.
     */
    show(){
        $('#' + this.HTMLid).removeClass('d-none');
        if(this.foo !== undefined){
            this.foo();
        }
    }

    /**
     * Hides this Showable's HTML.
     */
    hide(){
        $('#' + this.HTMLid).addClass('d-none');
        if(this.foo !== undefined){
            this.foo();
        }
    }

    /**
     * A method that runs every time the showable is hiden and shown.
     * 
     * @param {function} foo The function to be run when the set and hide.
     */
    setHideShowFunction(foo){
        this.foo = foo;
    }
}