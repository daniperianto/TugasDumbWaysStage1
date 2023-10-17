const IDNdateParser = require("./idn-date");

const DataProject = class {
    
    constructor(json) {
        this.getDataFromJson(json);
        this.durationInDays = this.getDurationProjectInDays(this.start_date, this.end_date);
        this.duration = this.getDurationProjectInMonthToString(this.durationInDays);
        this.blogOverflow = this.isOverflow(this.description, 7, 195);
        this.shortDescription = this.blogShorter(this.description, 7, 195);
        this.shortDescriptionArray = this.shortDescription.split("\n");
        this.idnStartDate = IDNdateParser(this.start_date);
        this.idnEndDate = IDNdateParser(this.end_date);
    }


    getDataFromJson(json) {
        this.title = json.title;
        this.start_date = json.start_date;
        this.end_date = json.end_date;
        this.description = json.description;
        this.node_js = false;
        this.react_js = false;
        this.next_js = false;
        this.typescript = false;

        if(json.technologies) {
            for( let technology of json.technologies) {
                switch (technology) {
                    case "node-js":
                        this.node_js = true;
                        break;
                    case "react-js":
                        this.react_js = true;
                        break;
                    case "next-js":
                        this.next_js = true;
                        break;
                    case "typescript":
                        this.typescript = true;
                        break;
                }
            }
        } else {
            this.node_js = json.node_js;
            this.react_js = json.react_js;
            this.next_js = json.next_js;
            this.typescript = json.typescript;
        }
        
    }

    // change date to dd-
    dateParser(date) {

    }

    getDurationProjectInMonthToString(days) {
        let monthDuration = Math.floor(days/30);
        let dayDuration = days%30;
    
        // if less than one month return in days
        if (monthDuration == 0) {
            return `${dayDuration} hari`;
        }
    
        if (dayDuration > 20 ) {
            monthDuration++;
        } else if (dayDuration <= 20 && dayDuration > 10) {
            monthDuration += 0.5;
        }
    
        return `${monthDuration} bulan`;
    }

    getDurationProjectInDays(StartDate, EndDate) {
        const oneDay = 1000*60*60*24;
    
        const startDateInMilliSeconds = new Date(StartDate).getTime();
        const endDateInMilliSeconds = new Date(EndDate).getTime();
        const durationInMilliSeconds = endDateInMilliSeconds - startDateInMilliSeconds;
    
        // add one because if it started and ended at the same day it counts as one day
        return Math.floor(durationInMilliSeconds/oneDay) + 1; 
    }

    blogShorter (blogContent, maxLine, maxChar) {
        // if blog content is short just return blog content unmodified
        const blogLineArray = blogContent.split("\n");
        if (blogLineArray.length <= maxLine && blogContent.length <= maxChar) {
            return blogContent;
        }


        const blogContentCut = this.cutBlogContent(blogContent, maxLine, maxChar);
        const contentArray = blogContentCut.split("\n");
        
        let blogContentDisplayed = ""
        for (let i=0; i<contentArray.length; i++) {
            if (i == contentArray.length - 1) { // last index
                blogContentDisplayed += `${contentArray[i]}\n`
            } else {
                blogContentDisplayed += `${contentArray[i]}\n`
            }
        }
    
        return blogContentDisplayed;
    }
    
    
    cutBlogContent(blogContent, maxLine, maxChar) {
        const blogLineArray = blogContent.split("\n");
        const maxCharPerLine = maxChar / maxLine;
        
    
        blogContent = "";
        let lineContent = 0;
        outer:
        for(const blogLine of blogLineArray) {
            const totalLineBlogLine = Math.ceil(blogLine.length / maxCharPerLine);
            if (lineContent + totalLineBlogLine < maxLine) {
                blogContent += blogLine + "\n";
                lineContent += totalLineBlogLine;
            } else {
                const blogLineUsedLine = maxLine - lineContent;
                blogContent += blogLine.substring(0,blogLineUsedLine*maxCharPerLine);
                break outer;
            }
        }
    
        return blogContent;
    }
    
    isOverflow(blogContent, maxLine, maxChar) {
        const contentArray = blogContent.split("\n")
        let totalChar = 0;
        for (const content of contentArray) {
            if (content.length < 33) {
                totalChar += maxChar/maxLine;
            } else {
                totalChar += content.length
            }
        }
    
        return totalChar > maxChar;
    }
    

}

module.exports = DataProject;