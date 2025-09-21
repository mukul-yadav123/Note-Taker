import Note from "../model/Note.js";

const getAllNotes = async(req,res) => {
 try {
    const notes = await Note.find();
    res.status(200).json(notes)
 } catch (error) {
    res.status(500).json({message: "Error " + error});
 }
};

const createNote = async(req,res) => {
    try {
        const {title,content} = req.body;
        const newNote = new Note({
            title,content
        })

        await newNote.save();
        res.status(201).json({message: "Note Created successfully"})
    } catch (error) {
        res.status(500).json({message: "Error " + error});
    }
}

const updateNote = async(req,res) => {
    try {
        const id = req.params.id;
        const {title,content} = req.body;
        const noteExist = await Note.findById(id);
        if(!noteExist)
            res.status(500).json({message: "Note Does not exist"});
        await Note.findByIdAndUpdate(id,{title,content})
        res.status(200).send({message: "Note updated successfully"})
    } catch (error) {
       res.status(500).json({message: "Error " + error}); 
    }
}

const deleteNote = async(req,res) => {
    try {
        const id = req.params.id;
         const noteExist = await Note.findById(id);
        if(!noteExist)
            return res.status(500).json({message: "Note Does not exist"});
        await Note.findByIdAndDelete(id);
        res.status(200).json({message: "Note Deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error " + error}); 
    }
}

export {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}