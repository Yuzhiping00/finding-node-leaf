// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FindNodes from "@/components/FindNodes.vue";
import fs from 'fs'
import path from 'path'


// path.resolve(__dirname, '../assets/data.txt') is used to genereate an absolute path to a file or directory

// --dirname is a global variable in Node.js that represents the absolute path of the directory containning the current file

// ../assets/data.txt is a relative path, which indicates you move up one directory

// then go into assests folder, then reference the data.txt file

// path.resolve() combines these path segments and returns the absolute path to data.txt
const fileContent = fs.readFileSync(path.resolve(__dirname, '../assets/data.txt'), 'utf8')

let wrapper;

wrapper = mount(FindNodes)

describe('Hardcoded Input Methods', () =>{

    it('generate error message when the first line contains leading spaces', () =>{
        wrapper.vm.methodText = "    This is no leading space string"
        wrapper.vm.highestCallerCount = 0
        expect(wrapper.vm.calculateNodeLeaf()).toBe(0)
        expect(wrapper.text()).toContain("Number of node leaf: 0")
        expect(wrapper.vm.leadingSpacesErrorMsg).toContain("Please remove the leading spaces from the first line.")
    })

    it('calculate node leaf correctly for valid input', () =>{
        wrapper.vm.highestCallerCount = 0
        wrapper.vm.methodText = "AlertAPI.updateExistingAlertTimes(AlertVO, long[], String)  (com.hinext.emr.api)\n"+
        "  AlertTask.run()  (com.hinext.emr.task)\n"+
        "  EMRAdmin.runAlert(HttpServletRequest, HttpServletResponse)  (com.hinext.emr.servlet)\n"+
        "       EMRAdmin.doPost(HttpServletRequest, HttpServletResponse)  (com.hinext.emr.servlet)\n"+
        "        EMRAdmin.doGet(HttpServletRequest, HttpServletResponse)  (com.hinext.emr.servlet)"
        expect(wrapper.vm.calculateNodeLeaf()).toBe(2)
    })   

})

describe("Import Text File Including Methods", () =>{
    it("Calculate Node Correctly Example", () =>{
        wrapper.vm.highestCallerCount = 0
        wrapper.vm.methodText = fileContent
        expect(typeof(fileContent)).toBe('string')
        expect(wrapper.vm.calculateNodeLeaf()).toBe(3)
        expect(wrapper.vm.leadingSpacesErrorMsg).toBe(null)
    })

    // it("Calculate Nodes Incorrectly Example", () =>{
    //     wrapper.vm.highestCallerCount = 0
    //     wrapper.vm.methodText = fileContent
    //     expect(typeof(fileContent)).toBe('string')
    //     expect(wrapper.vm.calculateNodeLeaf()).toBe(3)
    // })
})





