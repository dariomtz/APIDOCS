/**
 * Showable:
 * 
 * Showable is an abstract class for objects that will be rendered as HTML elements.
 * 
 * All classes that extend Showable must implement the following methods:
 * 
 * - render(): A method that returns the HTML that will be rendered. 
 *              It can be an async method, in case that waiting for information is necessary.
 * 
 * - activate(): A method that will run right after the object is rendered.
 *              This is ideal for setting event listeners and rendering elements that depend on
 *              the object that has just been rendered.
 */
class Showable {
    
    /**
     * Appends the Showable's HTML to an existing HTML object.
     * @async
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
     * @async
     * 
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
    }

    /**
     * Hides this Showable's HTML.
     */
    hide(){
        $('#' + this.HTMLid).addClass('d-none');
    }
}